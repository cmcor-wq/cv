import type { Metadata } from "next";
import { Container } from "@/components/ui";
import AskChat from "@/components/AskChat";

export const metadata: Metadata = {
  title: "Ask Me Anything — Carlos Miguel Corada",
};

export default function AskPage() {
  return (
    <Container className="py-16">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 font-mono text-[12px] text-accent-600">{"// ⭐ ask me anything"}</p>
        <h1 className="font-mono text-3xl font-bold leading-tight text-text sm:text-4xl">
          Chatea conmigo — literalmente
        </h1>
        <p className="mt-4 text-base leading-relaxed text-text-muted">
          Este chat responde como yo: honesto, directo, sin corporate speak. Si activas
          &ldquo;modo mamá&rdquo;, responde mi madre — con todo el cariño y la confusión encantadora
          que eso implica.
        </p>
      </div>

      <AskChat />
    </Container>
  );
}
