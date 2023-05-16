function Award({ nobel }) {
  return (
    <div className="margin-b">
      <h3> ชื่อ: {nobel.categoryFullName.en} </h3>
      <h4> ปี: {nobel.awardYear} </h4>
      {nobel.laureates === undefined || nobel.laureates.length === 0 ? (
        <h4>ไม่พบข้อมูล</h4>
      ) : (
        <div>
          {nobel.laureates.map((m, index) => {
            return (
              <h4 key={index}>
                {" "}
                แรงบรรดาลใจ {index + 1} : {m.motivation.en}
              </h4>
            );
          })}
        </div>
      )}
      <hr />

      <style jsx>
        {`
          h3 {
            font-size: 1.4rem;
          }
          h4 {
            font-size: 1rem;
          }
          .margin-b {
            margin-bottom: 20px;
          }
        `}
      </style>
    </div>
  );
}

export default Award;
