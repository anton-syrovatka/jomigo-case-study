const buildQuery = ({ year, page = 1 } = {}) => {
  const mongoQuery = {
    query: {},
    options: {
      sort: { date_utc: 1 },
      select: ["name", "flight_number", "date_utc", "details", "success"],
    },
  };

  if (Number.isInteger(year)) {
    Object.assign(mongoQuery.query, {
      date_utc: {
        $gte: new Date(String(year)).toISOString(),
        $lt: new Date(String(year + 1)).toISOString(),
      },
    });
  }

  if (Number.isInteger(page)) {
    Object.assign(mongoQuery.options, { page });
  }

  return mongoQuery;
};

module.exports.buildQuery = buildQuery;
