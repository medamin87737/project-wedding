import VideoBackground from "./VideoBackground";

export default function InvitationShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="invitation-shell relative mx-auto min-h-screen w-full max-w-mobile">
      <VideoBackground />
      <div className="invitation-content relative z-10">{children}</div>
    </div>
  );
}
