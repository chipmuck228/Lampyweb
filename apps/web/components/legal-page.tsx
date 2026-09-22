type LegalPageProps = {
  title: string;
  body: string;
};

export function LegalPage({ title, body }: LegalPageProps) {
  return (
    <main id="main" className="page-shell" style={{ padding: "4rem 0 6rem" }}>
      <h1 className="section-heading">{title}</h1>
      <p className="prose">{body}</p>
    </main>
  );
}
