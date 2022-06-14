import "./Paging.css";

const Paging = ({ onChange, pagingProps = {} }) => {
  const {
    page = 1,
    nextPage = 2,
    hasPrevPage,
    hasNextPage,
    limit = 10,
    totalDocs = 0,
  } = pagingProps;

  return (
    <div className="Paging">
      <div className="Paging-meta">
        {hasPrevPage ? (page - 1) * limit : 1} -{" "}
        {page * limit > totalDocs ? totalDocs : page * limit} of {totalDocs}
      </div>
      <button
        className="Paging-button left"
        onClick={() => onChange(page - 1)}
        disabled={!hasPrevPage}
      >
        ←
      </button>
      <button
        className="Paging-button right"
        onClick={() => onChange(nextPage)}
        disabled={!hasNextPage}
      >
        →
      </button>
    </div>
  );
};

export default Paging;
