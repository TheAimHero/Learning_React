export default function ResultsNum(props) {
  const { numMovies } = props;
  return (
    <p className="num-results">
      Found <strong>{numMovies}</strong> results
    </p>
  );
}
