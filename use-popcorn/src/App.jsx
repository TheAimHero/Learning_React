import { Fragment, useState } from "react";

import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import SearchBox from "./components/SearchBox";
import ResultsNum from "./components/ResultsNum";
import MoviesListBox from "./components/MoviesListBox";
import MoviesWatchedBox from "./components/MoviesWatchedBox";

import tempMovieData from "./dev-data/tempMovies";

export default function App() {
  const [movies] = useState(tempMovieData);

  return (
    <Fragment>
      <Navbar>
        <Logo />
        <SearchBox />
        <ResultsNum numMovies={movies.length} />
      </Navbar>
      <Main>
        <MoviesListBox movies={movies} />
        <MoviesWatchedBox />
      </Main>
    </Fragment>
  );
}
