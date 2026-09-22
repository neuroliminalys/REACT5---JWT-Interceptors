
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (localStorage.getItem("JWT")) {
    return children;
  } else {
    return <p>Forbidden</p>;
  }
}
