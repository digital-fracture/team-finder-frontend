import Footer from "@/src/components/footer";
import "./styles.scss";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="feed-layout">
      <div className="feed-wrapper">{children}</div>
      <Footer />
    </div>
  );
}
