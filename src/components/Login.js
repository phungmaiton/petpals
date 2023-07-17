import LoginForm from "./LoginForm";
import PageTransition from "./PageTransition";

export default function Login({ onLogin }) {
  return (
    <PageTransition>
      <section className="pt-[120px] pb-[80px] lg:pt-[170px] lg:pb-[100px] bg-blue relative overflow-hidden h-screen">
        <LoginForm onLogin={onLogin} />
      </section>
    </PageTransition>
  );
}
