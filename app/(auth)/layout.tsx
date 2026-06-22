export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="container-shell flex min-h-[calc(100vh-4rem)] items-center py-12">
      {children}
    </main>
  );
}
