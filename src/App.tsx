import React from "react";

const App: React.FC = () => {
  const [data, setData] = React.useState<any[]>([]);

  const { type, offset, limit } = React.useMemo(
    () => ({
      type: 0,
      offset: 0,
      limit: 10,
    }),
    []
  );

  React.useEffect(() => {
    const inverval = setInterval(() => {
      (async () => {
        try {
          const response = await fetch(
            `https://restv2.fireant.vn/posts?type=${type}&offset=${offset}&limit=${limit}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxODg5NjIyNTMwLCJuYmYiOjE1ODk2MjI1MzAsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsiYWNhZGVteS1yZWFkIiwiYWNhZGVteS13cml0ZSIsImFjY291bnRzLXJlYWQiLCJhY2NvdW50cy13cml0ZSIsImJsb2ctcmVhZCIsImNvbXBhbmllcy1yZWFkIiwiZmluYW5jZS1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImludmVzdG9wZWRpYS1yZWFkIiwib3JkZXJzLXJlYWQiLCJvcmRlcnMtd3JpdGUiLCJwb3N0cy1yZWFkIiwicG9zdHMtd3JpdGUiLCJzZWFyY2giLCJzeW1ib2xzLXJlYWQiLCJ1c2VyLWRhdGEtcmVhZCIsInVzZXItZGF0YS13cml0ZSIsInVzZXJzLXJlYWQiXSwianRpIjoiMjYxYTZhYWQ2MTQ5Njk1ZmJiYzcwODM5MjM0Njc1NWQifQ.dA5-HVzWv-BRfEiAd24uNBiBxASO-PAyWeWESovZm_hj4aXMAZA1-bWNZeXt88dqogo18AwpDQ-h6gefLPdZSFrG5umC1dVWaeYvUnGm62g4XS29fj6p01dhKNNqrsu5KrhnhdnKYVv9VdmbmqDfWR8wDgglk5cJFqalzq6dJWJInFQEPmUs9BW_Zs8tQDn-i5r4tYq2U8vCdqptXoM7YgPllXaPVDeccC9QNu2Xlp9WUvoROzoQXg25lFub1IYkTrM66gJ6t9fJRZToewCt495WNEOQFa_rwLCZ1QwzvL0iYkONHS_jZ0BOhBCdW9dWSawD6iF1SIQaFROvMDH1rg",
              },
            }
          );

          const dataResponse: any[] = await response.json();

          setData((prevData) => {
            if (prevData.length === 0) {
              return dataResponse;
            }

            const lastData: any = prevData[0];

            const newData = dataResponse.filter(
              (item) => item?.postID > lastData?.postID
            );

            return newData.concat(prevData);
          });
        } catch (error) {
          console.log(error);
        }
      })();
    }, 500);

    return () => {
      clearInterval(inverval);
    };
  }, [type, offset, limit]);

  return (
    <>
      {data.map((item, index) => (
        <div
          key={index}
          style={{
            padding: "20px",
            borderBottom: `1px solid #525252`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={`https://static.fireant.vn/users/avatar/${item?.user?.id}?width=60&height=60`}
              style={{
                borderRadius: "50%",
                height: 40,
                width: 40,
              }}
              onError={(event: any) => {
                event.target.src = `https://static.fireant.vn/users/avatar/39f97936-7a08-4627-a80f-3a1451f6e980?width=60&height=60`;
              }}
            />
            <span style={{ color: "#fff", margin: "0px 10px" }}>
              {`${item?.user?.name}`}
            </span>
          </div>
          <p
            style={{ color: "#fff" }}
            dangerouslySetInnerHTML={{ __html: item?.content }}
          />
          {item?.taggedSymbols?.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {item?.taggedSymbols?.map((ele: any, key: number) => (
                <div
                  style={{
                    marginTop: 10,
                    padding: "2px 5px",
                    borderRadius: "4px",
                    backgroundColor: "rgba(19,124,189,.35)",
                    marginRight: 8,
                  }}
                  key={key}
                >
                  <span style={{ color: "#48aff0" }}>{ele?.symbol}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default App;
