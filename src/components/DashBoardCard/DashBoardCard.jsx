import "./DashBoardCard.scss";

const DashBoardCard = ({ title, number, type }) => {
  return (
    <div className="dashBoardCard">
      <div className="topCard">
        <div className="icon">
          {type === "user" ? (
            <svg
              fill="#008080"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="50"
              height="50"
              viewBox="0 0 575.616 575.616"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M429.248,141.439C429.248,63.33,365.985,0,287.808,0c-78.109,0-141.439,63.33-141.439,141.439
			c0,78.11,63.33,141.439,141.439,141.439C365.988,282.878,429.248,219.549,429.248,141.439z M181.727,144.499
			c0,0-4.079-40.12,24.82-70.72c20.34,20.389,81.261,70.72,187.342,70.72c0,58.498-47.586,106.081-106.081,106.081
			S181.727,202.994,181.727,144.499z"
                  />
                  <path
                    d="M45.049,391.68v62.559v80.919c0,22.365,18.136,40.459,40.459,40.459h404.6c22.365,0,40.459-18.097,40.459-40.459v-80.919
			V391.68c0-44.688-36.193-80.919-80.919-80.919H377.91c-5.07,0-11.46,3.422-14.271,7.639l-70.735,99.982
			c-2.812,4.22-7.372,4.22-10.184,0l-70.738-99.986c-2.812-4.22-9.202-7.638-14.272-7.638h-71.742
			C81.319,310.758,45.049,346.991,45.049,391.68z"
                  />
                </g>
              </g>
            </svg>
          ) : (
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M7.40625 29.7021C5.91042 22.7167 5.16042 19.2229 7.0375 16.9042C8.9125 14.5833 12.4854 14.5833 19.6292 14.5833H30.3708C37.5167 14.5833 41.0854 14.5833 42.9625 16.9042C44.8396 19.225 44.0896 22.7167 42.5938 29.7021L41.7 33.8688C40.6854 38.6042 40.1792 40.9708 38.4604 42.3604C36.7417 43.75 34.3208 43.75 29.4792 43.75H20.5208C15.6792 43.75 13.2583 43.75 11.5417 42.3604C9.82083 40.9708 9.3125 38.6042 8.3 33.8688L7.40625 29.7021Z"
                fill="#008080"
              />
              <path
                d="M16.6667 23.4375C16.2523 23.4375 15.8548 23.6021 15.5618 23.8951C15.2688 24.1882 15.1042 24.5856 15.1042 25C15.1042 25.4144 15.2688 25.8118 15.5618 26.1049C15.8548 26.3979 16.2523 26.5625 16.6667 26.5625H33.3333C33.7477 26.5625 34.1452 26.3979 34.4382 26.1049C34.7312 25.8118 34.8958 25.4144 34.8958 25C34.8958 24.5856 34.7312 24.1882 34.4382 23.8951C34.1452 23.6021 33.7477 23.4375 33.3333 23.4375H16.6667ZM19.2708 31.25C19.2708 30.8356 19.4354 30.4382 19.7285 30.1451C20.0215 29.8521 20.4189 29.6875 20.8333 29.6875H29.1667C29.5811 29.6875 29.9785 29.8521 30.2715 30.1451C30.5645 30.4382 30.7292 30.8356 30.7292 31.25C30.7292 31.6644 30.5645 32.0618 30.2715 32.3549C29.9785 32.6479 29.5811 32.8125 29.1667 32.8125H20.8333C20.4189 32.8125 20.0215 32.6479 19.7285 32.3549C19.4354 32.0618 19.2708 31.6644 19.2708 31.25Z"
                fill="#008080"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M30.5521 4.85418C30.9226 4.66894 31.3515 4.6384 31.7445 4.76928C32.1375 4.90015 32.4624 5.18172 32.6479 5.55209L38.8979 18.0521C38.9915 18.2359 39.0477 18.4363 39.0634 18.642C39.0791 18.8476 39.0539 19.0543 38.9894 19.2501C38.9248 19.4459 38.8221 19.6271 38.6872 19.783C38.5523 19.939 38.3879 20.0667 38.2034 20.1588C38.0189 20.2509 37.818 20.3056 37.6122 20.3197C37.4065 20.3338 37.2 20.3071 37.0047 20.241C36.8093 20.1749 36.629 20.0708 36.4741 19.9347C36.3192 19.7986 36.1928 19.6331 36.1021 19.4479L29.8521 6.94793C29.667 6.57717 29.6368 6.14808 29.768 5.75504C29.8993 5.362 30.1813 5.03929 30.5521 4.85418ZM19.4479 4.85418C19.0774 4.66894 18.6485 4.6384 18.2555 4.76928C17.8625 4.90015 17.5376 5.18172 17.3521 5.55209L11.1021 18.0521C11.0085 18.2359 10.9523 18.4363 10.9366 18.642C10.9209 18.8476 10.9461 19.0543 11.0106 19.2501C11.0752 19.4459 11.1779 19.6271 11.3128 19.783C11.4477 19.939 11.6121 20.0667 11.7966 20.1588C11.9811 20.2509 12.182 20.3056 12.3878 20.3197C12.5935 20.3338 12.8 20.3071 12.9953 20.241C13.1907 20.1749 13.371 20.0708 13.5259 19.9347C13.6808 19.7986 13.8072 19.6331 13.8979 19.4479L20.1479 6.94793C20.333 6.57717 20.3632 6.14808 20.232 5.75504C20.1007 5.362 19.8187 5.03929 19.4479 4.85418Z"
                fill="#008080"
              />
            </svg>
          )}
        </div>
        <div className="info">
          <p>{title}</p>
          <span>{number}</span>
        </div>
      </div>
      <div className="bottom">
        <p>2.3% Last Weak</p>
      </div>
    </div>
  );
};

export default DashBoardCard;
