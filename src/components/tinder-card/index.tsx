"use client";

import Direction from "@/src/contracts/direction";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const VELOCITY_THRESHOLD = 0.5;
const SWIPE_POWER = 0.6;
const VERTICAL_SWIPE_THRESHOLD_RATIO = 0.05;
const HORIZONTAL_SWIPE_THRESHOLD_RATIO = 0.05;
const VERTICAL_SWIPE_DOWN_THRESHOLD_RATIO = 0.08; // Новый порог для свайпа вниз
const ANIMATION_DURATION = 800;

interface ITinderCardProps {
  card: any;
  onExpand: () => void;
  onCollapse: () => void;
  onSwipe: (direction: Direction, card: number) => void;
  updateSwipeFeedback: (x: number, y: number) => void;
  zIndex: number;
  offset: number;
  isPending: boolean;
}

const TinderCard = ({
  card,
  onExpand,
  onCollapse,
  onSwipe,
  updateSwipeFeedback,
  zIndex,
  offset,
  isPending,
}: ITinderCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, rotate: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const animationFrame = useRef<number>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const startTime = useRef<number>(0);

  const navigate = useNavigate();
  const location = useLocation();

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTopCard = offset === 0;
    setIsExpanded(isTopCard && location.state?.expandedCard === card.id);
  }, [location.state, card.id, offset]);

  const handleStart = (clientX: number, clientY: number) => {
    setStartPos({ x: clientX, y: clientY });
    setIsDragging(true);
    startTime.current = Date.now();
    const card = cardRef.current;

    if (!card) {
      return;
    }

    card.style.transition = "none";
  };

  const handleExpandCard = useCallback(() => {
    onExpand();
    navigate(location.pathname, {
      state: { expandedCard: card.id },
      replace: false,
    });

    const content = contentRef.current;

    if (content) {
      setContentHeight(content.scrollHeight);
    }
    const cardElement = cardRef.current;
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      cardElement.style.transform = `
                translate(${
                  window.innerWidth / 2 - rect.left - rect.width / 2
                }px, 
                        ${
                          window.innerHeight / 2 - rect.top - rect.height / 2
                        }px)
                scale(${(window.innerWidth / rect.width) * 0.95})
            `;
      cardElement.style.zIndex = "1000";
    }
  }, [onExpand, navigate, card.id, location.pathname]);

  const handleCollapseCard = useCallback(() => {
    onCollapse();
    setIsExpanded(false);
    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.style.transform = "translate(0, 0) scale(1)";
      cardElement.style.zIndex = zIndex.toString();
    }
    console.log("tap");
  }, [onCollapse, navigate, zIndex]);

  const handleClose = useCallback(() => {
    handleCollapseCard();
    setIsExpanded(false);
  }, [handleCollapseCard]);

  useEffect(() => {
    if (!isExpanded) return;

    const handlePopState = (event: PopStateEvent) => {
      if (!event.state?.expandedCard) {
        handleClose();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isExpanded, handleClose]);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    if (isPending) {
      // Инициализация анимации
      card.style.transition = "none";
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";

      // Запуск анимации после подготовки
      requestAnimationFrame(() => {
        card.style.transition = `
                    opacity 300ms ease-out,
                    transform 300ms cubic-bezier(0.18, 0.89, 0.32, 1.28)
                `;
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      });
    }
  }, [isPending]);

  const resetPosition = (duration = ANIMATION_DURATION) => {
    const cardElement = cardRef.current;

    if (!cardElement) {
      return;
    }

    const currentTransform = cardElement.style.transform;
    const currentOpacity = cardElement.style.opacity;

    cardElement.style.transition = `all ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`;

    cardElement.style.transform = "translate(0, 0) rotate(0deg)";
    cardElement.style.opacity = "1";

    const onTransitionEnd = () => {
      cardElement.removeEventListener("transitionend", onTransitionEnd);
      setPosition({ x: 0, y: 0, rotate: 0 });
      updateSwipeFeedback(0, 0);
      cardElement.style.transition = "";
    };

    cardElement.addEventListener("transitionend", onTransitionEnd);

    return () => {
      cardElement.removeEventListener("transitionend", onTransitionEnd);
      cardElement.style.transition = "";
      cardElement.style.transform = currentTransform;
      cardElement.style.opacity = currentOpacity;
    };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !animationFrame.current) return;

    cancelAnimationFrame(animationFrame.current);
    animationFrame.current = requestAnimationFrame(() => {
      const deltaX = clientX - startPos.x;
      const deltaY = clientY - startPos.y;
      const rotate = Math.min(Math.max(deltaX * 0.1, -15), 15);

      setPosition({ x: deltaX, y: deltaY, rotate });
      updateSwipeFeedback(deltaX, deltaY);
    });
  };

  const handleEnd = () => {
    if (!isDragging || isExpanded || !animationFrame.current) return;
    setIsDragging(false);
    cancelAnimationFrame(animationFrame.current);

    const { innerWidth, innerHeight } = window;
    const deltaTime = Date.now() - startTime.current;

    const velocity = {
      x: (position.x / (deltaTime || 1)) * SWIPE_POWER,
      y: (position.y / (deltaTime || 1)) * SWIPE_POWER,
    };

    const projectedPosition = {
      x: position.x + velocity.x * 150,
      y: position.y + velocity.y * 150,
    };

    const isHorizontal =
      Math.abs(projectedPosition.x) >
        innerWidth * HORIZONTAL_SWIPE_THRESHOLD_RATIO ||
      Math.abs(velocity.x) > VELOCITY_THRESHOLD;

    const isVerticalUp =
      projectedPosition.y < -innerHeight * VERTICAL_SWIPE_THRESHOLD_RATIO ||
      velocity.y < -VELOCITY_THRESHOLD;

    const isVerticalDown =
      projectedPosition.y > innerHeight * VERTICAL_SWIPE_DOWN_THRESHOLD_RATIO ||
      velocity.y > VELOCITY_THRESHOLD;

    const dynamicDuration = Math.min(
      ANIMATION_DURATION,
      ANIMATION_DURATION / (Math.abs(velocity.x) + Math.abs(velocity.y) + 0.1)
    );

    if (isVerticalDown) {
      handleExpandCard();
      resetPosition(dynamicDuration);
    } else if (isVerticalUp) {
      animateWithVelocity("up", dynamicDuration);
    } else if (isHorizontal) {
      animateWithVelocity(velocity.x > 0 ? "right" : "left", dynamicDuration);
    } else {
      resetPosition(dynamicDuration);
    }
  };

  const animateWithVelocity = (direction: Direction, duration: number) => {
    if (cardRef.current) {
      const targetX =
        direction === "right"
          ? window.innerWidth * 2
          : direction === "left"
          ? -window.innerWidth * 2
          : 0;

      const targetY = direction === "up" ? -window.innerHeight * 2 : 0;
      const rotation =
        direction === "right" ? 25 : direction === "left" ? -25 : 0;

      cardRef.current.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      cardRef.current.style.transform = `
                translate(${targetX}px, ${targetY}px)
                rotate(${rotation}deg)
            `;
      cardRef.current.style.opacity = "0";
    }

    setTimeout(() => {
      onSwipe(direction, card);
    }, 50);
  };

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    const scale = 1 - offset * 0.03;
    const translateY = -offset * 10;

    cardElement.style.transform = `
            translate(${position.x}px, ${position.y}px)
            rotate(${position.rotate}deg)
            scale(${scale})
            translateY(${translateY}px)
        `;
    cardElement.style.zIndex = zIndex.toString();
  }, [position, zIndex, offset]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isExpanded &&
        cardRef.current &&
        !cardRef.current.contains(e.target as Node)
      ) {
        handleCollapseCard();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded, handleCollapseCard]);

  return (
    <div
      ref={cardRef}
      id={card.id}
      className={`tinder--card ${isDragging ? "moving" : ""} ${
        isExpanded ? "expanded" : ""
      } ${isVisible ? "visible" : ""}`}
      onTouchStart={(e) =>
        !isExpanded &&
        handleStart(e.touches[0]?.clientX || 0, e.touches[0]?.clientY || 0)
      }
      onTouchMove={(e) =>
        !isExpanded &&
        handleMove(e.touches[0]?.clientX || 0, e.touches[0]?.clientY || 0)
      }
      onTouchEnd={!isExpanded ? handleEnd : undefined}
      onMouseDown={(e) => !isExpanded && handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => !isExpanded && handleMove(e.clientX, e.clientY)}
      onMouseUp={!isExpanded ? handleEnd : undefined}
      onMouseLeave={!isExpanded ? handleEnd : undefined}
      style={{
        backgroundImage: `url(${card.image_urls[0]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0,
      }}
    >
      <div className="card-content" ref={contentRef}></div>
    </div>
  );
};
export default TinderCard;
