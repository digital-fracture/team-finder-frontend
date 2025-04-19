"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CornerUpLeft, Heart, HeartOff, Save } from "lucide-react";
import Sidebar from "../sidebar";
import TinderCard from "../tinder-card";
import Direction from "@/src/contracts/direction";
import "styles.scss";

const VERTICAL_SWIPE_THRESHOLD_RATIO = 0.05;
const HORIZONTAL_SWIPE_THRESHOLD_RATIO = 0.05;
const VERTICAL_SWIPE_DOWN_THRESHOLD_RATIO = 0.08; // Новый порог для свайпа вниз
const ANIMATION_DURATION = 800;
const ANIMATE_SCROLL = 100;
const authToken =
  "user=%7B%22id%22%3A1671274831%2C%22first_name%22%3A%22%D0%A1%D0%BE%D1%84%D1%8C%D1%8F%22%2C%22last_name%22%3A%22%D0%9C%D0%B0%D1%80%D1%87%D1%83%D0%BA%22%2C%22username%22%3A%22scarlettnik%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F9zQoUimkDP8GJlxHvaSdoTyyBjp-d_3fHGjyYeoPoTI.svg%22%7D&chat_instance=-6489690302062850781&chat_type=sender&auth_date=1742513384&signature=tr7IXxOkPsCygck72EqkJ1MtXDf2zvLF74pCKeyXNp8iNjJ9n3GBE7tQHQMuqAVCp3WyYdx5rQ2WO1fBtCaSBg&hash=c0a2ab6465de8874bbc9428faab5e30a58927f259b6d824e5f017605f7a4bfcd";

const TinderCards = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [basket, setBasket] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [swipeProgress, setSwipeProgress] = useState<{
    direction: Direction | null;
    opacity: number;
  }>({
    direction: null,
    opacity: 0,
  });
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [swipeHistory, setSwipeHistory] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchCards = useCallback(async () => {
    if (!hasMore || isFetching) return;

    try {
      setIsFetching(true);
      const response = await fetch(
        `https://marlin-darling-pipefish.ngrok-free.app/v1/catalog/feed`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
            Authorization: `tma ${authToken}`,
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const newCards = await response.json();
      const filtered = newCards.filter(
        (card: any) => !cards.some((c) => c.id === card.id)
      );

      if (filtered.length === 0) {
        setHasMore(false);
        return;
      }

      // Добавляем карточки с флагом pending и уникальным ключом
      const pendingCards = filtered.map((card: any) => ({
        ...card,
        _pending: true,
        _key: Math.random().toString(36).substr(2, 9),
      }));

      setCards((prev) => [...prev, ...pendingCards]);

      // Через короткую паузу снимаем флаг pending
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => (c._pending ? { ...c, _pending: false } : c))
        );
      }, 50);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  }, [hasMore, isFetching]);

  useEffect(() => {
    if (cards.length <= 3 && hasMore && !isFetching) {
      fetchCards();
    }
  }, [cards.length, hasMore, isFetching, fetchCards]);

  // console.log(cards);
  const animateSwipe = useCallback((direction: Direction, cardId: string) => {
    const card = document.getElementById(cardId);
    if (!card) return;

    const { innerWidth, innerHeight } = window;
    const rotation = direction === "right" ? 25 : -25;

    card.style.transition = `all ${ANIMATION_DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;

    switch (direction) {
      case "left":
        card.style.transform = `translate(-${
          innerWidth * 2
        }px, 0) rotate(${rotation}deg)`;
        break;
      case "right":
        card.style.transform = `translate(${
          innerWidth * 2
        }px, 0) rotate(${rotation}deg)`;
        break;
      case "up":
        card.style.transform = `translate(0, -${
          innerHeight * 2
        }px) rotate(0deg)`;
        break;
      case "down":
        card.style.transform = `translate(0, ${
          innerHeight * 2
        }px) rotate(0deg)`;
        break;
    }

    card.style.opacity = "0";
  }, []);

  const animateReturn = useCallback((cardId: string) => {
    const card = document.getElementById(cardId);
    if (!card) return;

    card.style.transition = `all ${ANIMATION_DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    card.style.transform = "translate(0, 0) rotate(0deg)";
    card.style.opacity = "1";
  }, []);

  const undoSwipe = useCallback(() => {
    if (swipeHistory.length === 0) return;

    const lastAction: any = swipeHistory[0];
    setSwipeHistory((prev) => prev.slice(1));

    // Возвращаем карточку в начало списка
    setCards((prev) => [lastAction.card, ...prev]);

    // Убираем из корзины если нужно
    if (lastAction.direction === "up") {
      setBasket((prev) => prev.filter((c) => c.id !== lastAction.card.id));
    }

    // Анимация возврата
    animateReturn(lastAction.card.id);
  }, [swipeHistory, animateReturn]);

  const handleSwipe = useCallback(
    (direction: Direction, card: any) => {
      animateSwipe(direction, card.id);
      setSwipeProgress({ direction: null, opacity: 0 });
      setSwipeHistory((prev: any) => [{ direction, card }, ...prev]);

      setTimeout(() => {
        setCards((prev) => prev.filter((c) => c.id !== card.id));
        if (direction === "up") setBasket((prev) => [...prev, card]);
      }, ANIMATE_SCROLL);
    },
    [animateSwipe]
  );

  const updateSwipeFeedback = useCallback((dx: number, dy: number) => {
    const swipeThreshold = window.innerWidth * HORIZONTAL_SWIPE_THRESHOLD_RATIO;
    const verticalThreshold =
      window.innerHeight * VERTICAL_SWIPE_THRESHOLD_RATIO;
    const verticalDownThreshold =
      window.innerHeight * VERTICAL_SWIPE_DOWN_THRESHOLD_RATIO;

    let direction: Direction | null = null;
    let opacity = 0;

    if (Math.abs(dx) > Math.abs(dy * 1.5)) {
      direction = dx > 0 ? "right" : "left";
      opacity = Math.min(Math.abs(dx) / swipeThreshold, 1);
    } else if (dy < -verticalThreshold) {
      direction = "up";
      opacity = Math.min(Math.abs(dy) / verticalThreshold, 1);
    } else if (dy > verticalDownThreshold) {
      direction = "down";
      opacity = Math.min(dy / verticalDownThreshold, 1);
    }

    setSwipeProgress({ direction, opacity });
  }, []);

  const handleButtonSwipe = (direction: Direction) => {
    if (!cards[0]) return;

    const card = cards[0];
    const cardElement = document.getElementById(card.id);
    if (cardElement) {
      cardElement.style.transition = `all ${ANIMATION_DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    }
    handleSwipe(direction, card);
  };

  if (loading) return <div className="loading">Загрузка карточек...</div>;
  // if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="tinder">
      <button
        className="undo-button"
        onClick={undoSwipe}
        disabled={swipeHistory.length === 0}
      >
        <CornerUpLeft
          style={{ backgroundColor: "white" }}
          className="undo-icon"
          size={24}
        />
      </button>
      <div className="tinder--status">
        <HeartOff
          className="status-icon nope"
          style={getIconStyle("left", swipeProgress)}
        />
        <Heart
          className="status-icon love"
          style={getIconStyle("right", swipeProgress)}
        />
        <Save
          className="status-icon basket"
          style={getIconStyle("up", swipeProgress)}
        />
      </div>

      <div className="tinder--cards">
        {cards.map((card, index) => (
          <TinderCard
            key={card.id}
            card={card}
            onSwipe={handleSwipe}
            updateSwipeFeedback={updateSwipeFeedback}
            zIndex={cards.length - index}
            offset={index}
            // isExpanded={expandedCardId === card.id}
            onExpand={() => setExpandedCardId(card.id)}
            onCollapse={() => setExpandedCardId(null)}
            isPending={card._pending}
          />
        ))}
        {cards.length === 0 && (
          <div className="empty-state">
            <h2>No more cards!</h2>
          </div>
        )}
      </div>

      <div
        className="tinder--buttons"
        style={{ display: expandedCardId ? "none" : "flex" }}
      >
        <button onClick={() => handleButtonSwipe("left")}>
          <HeartOff className="icon" size={24} />
        </button>
        <button onClick={() => handleButtonSwipe("up")}>
          <Save className="icon" size={24} />
        </button>
        <button onClick={() => handleButtonSwipe("right")}>
          <Heart className="icon" size={24} />
        </button>
      </div>
      <Sidebar />
    </div>
  );
};

const getIconStyle = (direction: any, swipeProgress: any) => ({
  opacity: swipeProgress.direction === direction ? swipeProgress.opacity : 0,
  transform: `scale(${
    0.8 +
    (swipeProgress.direction === direction ? swipeProgress.opacity * 0.9 : 0)
  })`,
  transition: "all 0.2s ease-out",
});

export default TinderCards;
