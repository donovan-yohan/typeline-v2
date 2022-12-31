import { useHover } from "@mantine/hooks";
import { useLogoStyles } from "./Logo.style";

export default function Logo() {
  const { hovered, ref } = useHover();

  const { classes } = useLogoStyles({ hovered });
  return (
    <div ref={ref} className={classes.logo}>
      <svg
        width="86"
        height="40"
        viewBox="0 0 427 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={classes.logoSvg}>
          <rect x="402.67" width="24" height="200" rx="12" />
          <path d="M225.772 128.38C230.014 128.38 233.741 127.348 236.952 125.284C240.162 123.22 242.628 120.182 244.348 116.168C246.182 112.04 247.1 106.938 247.1 100.86C247.1 91.687 245.15 84.8643 241.252 80.3923C237.353 75.8056 232.193 73.5123 225.772 73.5123C221.529 73.5123 217.802 74.5443 214.592 76.6083C211.381 78.5576 208.858 81.5963 207.024 85.7243C205.304 89.7376 204.444 94.783 204.444 100.86C204.444 109.919 206.393 116.799 210.292 121.5C214.19 126.087 219.35 128.38 225.772 128.38Z" />
          <path d="M297.237 93.4643C297.631 90.2061 298.383 87.2821 299.493 84.6923C301.327 80.5643 303.907 77.411 307.233 75.2323C310.673 72.939 314.801 71.7923 319.617 71.7923C323.974 71.7923 327.586 72.767 330.453 74.7163C333.434 76.551 335.67 79.2456 337.161 82.8003C338.497 85.7591 339.277 89.3138 339.501 93.4643H297.237Z" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.1726 0C5.37212 0 0.669922 4.7022 0.669922 10.5027V189.497C0.669922 195.298 5.37211 200 11.1726 200H372.167C377.968 200 382.67 195.298 382.67 189.497V10.5027C382.67 4.7022 377.968 0 372.167 0H11.1726ZM49.9609 140.936C55.0062 143.459 61.2555 144.72 68.7089 144.72C70.5435 144.72 72.6649 144.491 75.0729 144.032C77.4809 143.688 79.4302 143.287 80.9209 142.828C82.8702 142.14 84.1889 140.936 84.8769 139.216C85.6795 137.382 86.0809 135.318 86.0809 133.024C86.0809 130.043 85.6222 128.094 84.7049 127.176C83.7875 126.144 82.6409 125.686 81.2649 125.8C80.1182 125.915 78.7995 126.144 77.3089 126.488C75.8182 126.832 74.0982 127.004 72.1489 127.004C66.7595 127.004 62.8609 125.628 60.4529 122.876C58.0449 120.124 56.8409 115.996 56.8409 110.492V75.0603H75.0729C77.8249 75.0603 79.9462 74.3723 81.4369 72.9963C82.9275 71.5056 83.6729 69.499 83.6729 66.9763C83.6729 64.339 82.9275 62.3323 81.4369 60.9563C79.9462 59.5803 77.8249 58.8923 75.0729 58.8923H56.8409V43.2403C56.8409 39.6856 55.9235 36.991 54.0889 35.1563C52.2542 33.3216 49.6169 32.4043 46.1769 32.4043C42.7369 32.4043 40.0422 33.3216 38.0929 35.1563C36.2582 36.991 35.3409 39.6856 35.3409 43.2403V58.8923H26.3969C23.6449 58.8923 21.5235 59.5803 20.0329 60.9563C18.5422 62.3323 17.7969 64.339 17.7969 66.9763C17.7969 69.499 18.5422 71.5056 20.0329 72.9963C21.5235 74.3723 23.6449 75.0603 26.3969 75.0603H35.3409V111.696C35.3409 118.92 36.5449 124.998 38.9529 129.928C41.3609 134.744 45.0302 138.414 49.9609 140.936ZM113.049 173.272C114.654 174.648 116.718 175.336 119.241 175.336C121.993 175.336 124.229 174.763 125.949 173.616C127.669 172.47 129.274 170.291 130.765 167.08L172.561 71.6203C173.707 69.0976 174.109 66.8043 173.765 64.7403C173.421 62.5616 172.503 60.8416 171.013 59.5803C169.522 58.2043 167.515 57.5163 164.993 57.5163C162.126 57.5163 159.833 58.147 158.113 59.4083C156.393 60.555 154.902 62.7336 153.641 65.9443L132.509 117.701L111.845 66.1163C110.583 62.791 109.15 60.555 107.545 59.4083C105.939 58.147 103.818 57.5163 101.181 57.5163C98.0846 57.5163 95.6193 58.2043 93.7846 59.5803C92.0646 60.8416 91.0326 62.5616 90.6886 64.7403C90.3446 66.919 90.6886 69.2696 91.7206 71.7923L121.052 139.641L111.329 161.232C110.297 163.64 109.895 165.934 110.125 168.112C110.469 170.291 111.443 172.011 113.049 173.272ZM193.952 175.336C190.512 175.336 187.874 174.419 186.04 172.584C184.205 170.75 183.288 168.055 183.288 164.5V68.3523C183.288 64.7976 184.205 62.103 186.04 60.2683C187.874 58.4336 190.454 57.5163 193.78 57.5163C197.22 57.5163 199.857 58.4336 201.692 60.2683C203.526 62.103 204.444 64.7976 204.444 68.3523V71.9099C206.398 68.1861 209.265 65.0509 213.044 62.5043C218.433 58.9496 224.682 57.1723 231.792 57.1723C239.13 57.1723 245.552 58.9496 251.056 62.5043C256.674 66.059 261.032 71.1043 264.128 77.6403C267.224 84.0616 268.772 91.8016 268.772 100.86C268.772 109.804 267.224 117.602 264.128 124.252C261.032 130.788 256.732 135.834 251.228 139.388C245.724 142.943 239.245 144.72 231.792 144.72C224.797 144.72 218.662 143 213.388 139.56C209.664 137.051 206.797 134.027 204.788 130.488V164.5C204.788 168.055 203.813 170.75 201.864 172.584C200.029 174.419 197.392 175.336 193.952 175.336ZM298.117 139.388C304.997 142.943 313.195 144.72 322.713 144.72C327.185 144.72 332.001 144.147 337.161 143C342.435 141.739 347.079 139.847 351.093 137.324C353.157 136.063 354.59 134.572 355.393 132.852C356.31 131.132 356.654 129.47 356.425 127.864C356.195 126.144 355.507 124.711 354.361 123.564C353.329 122.418 351.895 121.787 350.061 121.672C348.226 121.443 346.105 122.016 343.697 123.392C340.371 125.227 336.817 126.546 333.033 127.348C329.363 128.036 326.038 128.38 323.057 128.38C314.457 128.38 307.921 126.087 303.449 121.5C299.988 117.766 297.901 112.549 297.189 105.848H349.201C351.838 105.848 353.845 105.332 355.221 104.3C356.711 103.154 357.457 101.548 357.457 99.4843C357.457 92.9483 356.539 87.1003 354.705 81.9403C352.985 76.6656 350.405 72.1936 346.965 68.5243C343.639 64.855 339.569 62.0456 334.753 60.0963C330.051 58.147 324.719 57.1723 318.757 57.1723C310.615 57.1723 303.334 59.0643 296.913 62.8483C290.606 66.5176 285.618 71.6203 281.949 78.1563C278.394 84.6923 276.617 92.3176 276.617 101.032C276.617 109.976 278.451 117.716 282.121 124.252C285.905 130.788 291.237 135.834 298.117 139.388Z"
          />
        </g>
      </svg>
    </div>
  );
}