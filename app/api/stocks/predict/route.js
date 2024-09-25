export const POST = async (request) => {
  try {
    let body = await request.json();

    body.forEach((entries) => {
      const { m, b } = linearRegression(
        Array.from({ length: entries.length }, (_, i) => i + 1),
        entries.map((entry) => entry.value)
      );

      let timestamp = entries[entries.length - 1].timestamp;
      for (let index = 0; index < 3; index++) {
        timestamp = getDateForNextEntry(timestamp);
        entries.push({
          stockId: entries[0].stockId,
          timestamp: timestamp,
          value: (m * (entries.length + index + 1) + b).toFixed(1),
        });
      }
    });

    return new Response(JSON.stringify(body), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

function linearRegression(x, y) {
  const n = x.length;

  const sumX = x.reduce((acc, val) => acc + val, 0);
  const sumY = y.reduce((acc, val) => acc + val, 0);
  const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
  const sumXSquare = x.reduce((acc, val) => acc + val * val, 0);

  const m = (n * sumXY - sumX * sumY) / (n * sumXSquare - sumX * sumX);
  const b = (sumY - m * sumX) / n;

  return { m, b };
}

function getDateForNextEntry(dateString) {
  const [day, month, year] = dateString.split("-");
  let date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + 1);
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("-");
}
