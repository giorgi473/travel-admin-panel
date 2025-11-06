export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/Generated.mp4" type="video/mp4" />
          <source src="/video/Generated.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center antialiased">
          <div className="max-w-sm mx-auto px-4 w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
