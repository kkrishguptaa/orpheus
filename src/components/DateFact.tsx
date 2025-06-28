export default async function DateFact({
  date,
  month,
}: {
  date: number;
  month: number;
}) {
  const fact = await fetch(`http://numbersapi.com/${date}/${month}/date`).then(
    (res) => res.text()
  );

  return (
    <section className="my-8 text-lg text-zinc-400">
      The day this poem was written, {fact}
    </section>
  );
}
