export default function Place({ params }: { params: { place: string } }) {
  return <div>{params.place}</div>;
}
