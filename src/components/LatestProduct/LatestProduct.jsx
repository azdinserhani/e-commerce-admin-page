import "./LatestProduct.scss";

const LatestProduct = ({ data }) => {
  // const data = [
  //   {
  //     img: "https://5.imimg.com/data5/SELLER/Default/2023/6/312743853/CM/HM/IA/4630526/apple-iphone-14-pro-max-128gb-deep-purple-mobile-phone-250x250.png",
  //     name: "iphone",
  //     price: 300,
  //   },
  //   {
  //     img: "https://5.imimg.com/data5/SELLER/Default/2023/6/312743853/CM/HM/IA/4630526/apple-iphone-14-pro-max-128gb-deep-purple-mobile-phone-250x250.png",
  //     name: "iphone",
  //     price: 300,
  //   },
  //   {
  //     img: "https://5.imimg.com/data5/SELLER/Default/2023/6/312743853/CM/HM/IA/4630526/apple-iphone-14-pro-max-128gb-deep-purple-mobile-phone-250x250.png",
  //     name: "iphone",
  //     price: 300,
  //   },
  // ];
  return (
    <div className="latestProduct">
      <div className="head">
        <h3>Top selling product</h3>
        <span>see all</span>
      </div>

      {data.map((item) => {
        return (
          <div className="card">
            <img src={item.img} alt="" />
            <div className="info">
              <h2>{item._id}</h2>
              <span>{item.price}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LatestProduct;
