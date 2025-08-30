import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Hello World!!</h1>
        <p className="text-muted-foreground">Sistema Core - Estoque</p>
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded">
          Tailwind está funcionando!
        </div>
      </div>
    </div>
  );
}
