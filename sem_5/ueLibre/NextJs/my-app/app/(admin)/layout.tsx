export default function DashboardLayout({ children } : { children: React.ReactNode }) {
  return (
    <div>
      <a href="/users">users | </a>
      <a href="/dashboard">Dashboard</a>
      <main>{children}</main>
      <footer>&copy; 2025</footer>
    </div>
  );
}