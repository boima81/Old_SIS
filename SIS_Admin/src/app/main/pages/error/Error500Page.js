import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

function Error500Page() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="w-full max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
        >
          <Box
            component="svg"
            width="100%"
            height="100%"
            viewBox="0 0 1120 699"
            fill="none"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
            sx={{ color: "secondary.main" }}
          >
            <g clipPath="url(#clip0)">
              <path
                d="M0 51.1424C0 128.64 48.6181 191.351 108.701 191.351L0 51.1424Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M108.701 191.351C108.701 112.982 162.956 49.567 230.004 49.567L108.701 191.351Z"
                fill="currentColor"
              />
              <path
                d="M39.3843 58.1677C39.3843 131.782 70.3872 191.351 108.701 191.351L39.3843 58.1677Z"
                fill="currentColor"
              />
              <path
                d="M108.701 191.351C108.701 91.2128 171.411 10.1827 248.909 10.1827L108.701 191.351Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M85.8329 192.339C85.8329 192.339 101.248 191.864 105.894 188.556C110.54 185.248 129.607 181.298 130.76 186.603C131.912 191.909 153.927 212.991 136.522 213.132C119.118 213.272 96.0831 210.421 91.4462 207.596C86.8093 204.772 85.8329 192.339 85.8329 192.339Z"
                fill="#A8A8A8"
              />
              <path
                opacity="0.2"
                d="M136.833 211.285C119.429 211.425 96.3938 208.574 91.7568 205.749C88.2256 203.598 86.8184 195.88 86.3476 192.319C86.0215 192.333 85.8329 192.339 85.8329 192.339C85.8329 192.339 86.8093 204.772 91.4463 207.596C96.0832 210.421 119.118 213.272 136.523 213.132C141.546 213.091 143.282 211.304 143.186 208.656C142.488 210.256 140.572 211.255 136.833 211.285Z"
                fill="black"
              />
              <path
                opacity="0.3"
                d="M198.609 449.94C301.886 449.94 385.609 438.55 385.609 424.5C385.609 410.45 301.886 399.06 198.609 399.06C95.3319 399.06 11.6091 410.45 11.6091 424.5C11.6091 438.55 95.3319 449.94 198.609 449.94Z"
                className="text-gray-900 dark:text-gray-400"
                fill="currentColor"
              />
              <path
                opacity="0.3"
                d="M836.609 699C992.906 699 1119.61 681.763 1119.61 660.5C1119.61 639.237 992.906 622 836.609 622C680.313 622 553.609 639.237 553.609 660.5C553.609 681.763 680.313 699 836.609 699Z"
                className="text-gray-900 dark:text-gray-400"
                fill="currentColor"
              />
              <path
                opacity="0.3"
                d="M310.609 668.627C404.498 668.627 480.609 658.273 480.609 645.5C480.609 632.727 404.498 622.373 310.609 622.373C216.721 622.373 140.609 632.727 140.609 645.5C140.609 658.273 216.721 668.627 310.609 668.627Z"
                className="text-gray-900 dark:text-gray-400"
                fill="currentColor"
              />
              <path
                d="M462.609 626C552.609 649 725.609 596 744.609 536"
                className="text-gray-800 dark:text-gray-600"
                stroke="currentColor"
                strokeWidth="3"
                strokeMiterlimit="10"
              />
              <path
                d="M309.609 259C309.609 259 439.609 223 447.609 339C455.609 455 340.609 488 430.609 511"
                className="text-gray-800 dark:text-gray-600"
                stroke="currentColor"
                strokeWidth="3"
                strokeMiterlimit="10"
              />
              <path
                d="M184.011 537.283C184.011 537.283 223.084 526.463 225.488 561.328C227.893 596.192 193.329 606.111 220.379 613.024"
                className="text-gray-800 dark:text-gray-600"
                stroke="currentColor"
                strokeWidth="3"
                strokeMiterlimit="10"
              />
              <path
                d="M778.705 563.24L770.827 613.535C770.827 613.535 732.045 634.138 759.314 634.744C786.582 635.35 915.047 634.744 915.047 634.744C915.047 634.744 939.892 634.744 900.504 612.929L892.626 560.21L778.705 563.24Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                opacity="0.1"
                d="M753.828 634.198C760.021 628.688 770.827 622.946 770.827 622.946L778.705 572.651L892.626 572.758L900.504 622.34C909.689 627.427 915.379 631.327 918.707 634.318C923.766 633.164 929.295 628.875 900.504 612.929L892.626 560.21L778.705 563.24L770.827 613.535C770.827 613.535 738.239 630.85 753.828 634.198Z"
                fill="black"
              />
              <path
                d="M1073.64 212.689H596.479C586.512 212.689 578.433 220.768 578.433 230.734V552.163C578.433 562.129 586.512 570.208 596.479 570.208H1073.64C1083.61 570.208 1091.69 562.129 1091.69 552.163V230.734C1091.69 220.768 1083.61 212.689 1073.64 212.689Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M1074.42 231.777H595.703V499.613H1074.42V231.777Z"
                className="text-gray-700"
                fill="currentColor"
              />
              <path
                d="M835.06 226.323C836.733 226.323 838.089 224.966 838.089 223.293C838.089 221.62 836.733 220.263 835.06 220.263C833.386 220.263 832.03 221.62 832.03 223.293C832.03 224.966 833.386 226.323 835.06 226.323Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M1091.69 520.822V552.163C1091.69 554.533 1091.22 556.879 1090.31 559.069C1089.41 561.258 1088.08 563.248 1086.4 564.924C1084.73 566.599 1082.74 567.929 1080.55 568.835C1078.36 569.742 1076.01 570.209 1073.64 570.208H596.479C594.109 570.209 591.762 569.742 589.573 568.835C587.383 567.929 585.393 566.599 583.718 564.924C582.042 563.248 580.713 561.258 579.806 559.069C578.899 556.879 578.433 554.533 578.433 552.163V520.822H1091.69Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M968.978 667.466V673.526H642.968V668.678L643.417 667.466L651.452 645.651H962.312L968.978 667.466Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M1094.44 661.534C1093.84 664.073 1091.6 666.751 1086.54 669.284C1068.36 678.373 1031.39 666.86 1031.39 666.86C1031.39 666.86 1002.91 662.012 1002.91 649.287C1003.71 648.739 1004.55 648.244 1005.41 647.803C1013.05 643.759 1038.39 633.781 1083.33 648.225C1086.64 649.264 1089.59 651.202 1091.87 653.822C1093.69 655.954 1095.12 658.657 1094.44 661.534Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                opacity="0.1"
                d="M1094.44 661.534C1072.19 670.06 1052.35 670.696 1032 656.559C1021.73 649.432 1012.41 647.669 1005.41 647.802C1013.05 643.759 1038.39 633.781 1083.33 648.225C1086.64 649.264 1089.59 651.202 1091.87 653.822C1093.69 655.953 1095.12 658.657 1094.44 661.534Z"
                fill="black"
              />
              <path
                d="M1066.54 656.559C1070.89 656.559 1074.42 655.473 1074.42 654.135C1074.42 652.796 1070.89 651.711 1066.54 651.711C1062.19 651.711 1058.66 652.796 1058.66 654.135C1058.66 655.473 1062.19 656.559 1066.54 656.559Z"
                className="text-gray-100"
                fill="currentColor"
              />
              <path
                d="M835.06 557.18C841.418 557.18 846.573 552.026 846.573 545.667C846.573 539.308 841.418 534.154 835.06 534.154C828.701 534.154 823.546 539.308 823.546 545.667C823.546 552.026 828.701 557.18 835.06 557.18Z"
                className="text-gray-100"
                fill="currentColor"
              />
              <path
                opacity="0.1"
                d="M968.978 667.466V673.526H642.968V668.678L643.417 667.466H968.978Z"
                fill="black"
              />
              <path
                d="M316.609 159H108.609V401H316.609V159Z"
                className="text-gray-700"
                fill="currentColor"
              />
              <path
                d="M337.609 135H87.6091V221H337.609V135Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M337.609 237H87.6091V323H337.609V237Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M337.609 339H87.6091V425H337.609V339Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                opacity="0.4"
                d="M277.609 150H261.609V166H277.609V150Z"
                fill="currentColor"
              />
              <path
                opacity="0.8"
                d="M300.609 150H284.609V166H300.609V150Z"
                fill="currentColor"
              />
              <path
                d="M323.609 150H307.609V166H323.609V150Z"
                fill="currentColor"
              />
              <path
                opacity="0.4"
                d="M277.609 251H261.609V267H277.609V251Z"
                fill="currentColor"
              />
              <path
                opacity="0.8"
                d="M300.609 251H284.609V267H300.609V251Z"
                fill="currentColor"
              />
              <path
                d="M323.609 251H307.609V267H323.609V251Z"
                fill="currentColor"
              />
              <path
                opacity="0.4"
                d="M277.609 352H261.609V368H277.609V352Z"
                fill="currentColor"
              />
              <path
                opacity="0.8"
                d="M300.609 352H284.609V368H300.609V352Z"
                fill="currentColor"
              />
              <path
                d="M323.609 352H307.609V368H323.609V352Z"
                fill="currentColor"
              />
              <path
                d="M316.609 617C360.24 617 395.609 581.63 395.609 538C395.609 494.37 360.24 459 316.609 459C272.979 459 237.609 494.37 237.609 538C237.609 581.63 272.979 617 316.609 617Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M304.609 600H280.609V643H304.609V600Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M352.609 600H328.609V643H352.609V600Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M300.609 651C311.655 651 320.609 647.642 320.609 643.5C320.609 639.358 311.655 636 300.609 636C289.563 636 280.609 639.358 280.609 643.5C280.609 647.642 289.563 651 300.609 651Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M348.609 650C359.655 650 368.609 646.642 368.609 642.5C368.609 638.358 359.655 635 348.609 635C337.563 635 328.609 638.358 328.609 642.5C328.609 646.642 337.563 650 348.609 650Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M318.609 545C333.521 545 345.609 532.912 345.609 518C345.609 503.088 333.521 491 318.609 491C303.697 491 291.609 503.088 291.609 518C291.609 532.912 303.697 545 318.609 545Z"
                className="text-gray-50"
                fill="currentColor"
              />
              <path
                d="M318.609 527C323.58 527 327.609 522.971 327.609 518C327.609 513.029 323.58 509 318.609 509C313.639 509 309.609 513.029 309.609 518C309.609 522.971 313.639 527 318.609 527Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M239.976 464.532C233.598 435.965 253.988 407.098 285.52 400.057C317.053 393.017 347.786 410.467 354.164 439.035C360.543 467.603 339.646 478.139 308.114 485.18C276.582 492.221 246.355 493.1 239.976 464.532Z"
                fill="currentColor"
              />
              <path
                d="M390.703 522.244C410.759 513.66 424.833 501.597 422.138 495.301C419.443 489.005 401 490.86 380.945 499.444C360.889 508.028 346.816 520.09 349.511 526.386C352.205 532.682 370.648 530.827 390.703 522.244Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M242.703 575.244C262.759 566.66 276.833 554.597 274.138 548.301C271.443 542.005 253 543.86 232.945 552.444C212.889 561.027 198.816 573.09 201.511 579.386C204.205 585.682 222.648 583.827 242.703 575.244Z"
                className="text-gray-800"
                fill="currentColor"
              />
              <path
                d="M362.609 561C362.609 568.732 342.7 584 320.609 584C298.518 584 277.609 569.732 277.609 562C277.609 554.268 298.518 556 320.609 556C342.7 556 362.609 553.268 362.609 561Z"
                className="text-gray-50"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="1119.61" height="699" fill="white" />
              </clipPath>
            </defs>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          <Typography
            variant="h1"
            className="mt-48 sm:mt-96 text-4xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-none text-center"
          >
            Something went wrong!
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          <Typography
            variant="h5"
            color="text.secondary"
            className="mt-8 text-lg md:text-xl font-medium tracking-tight text-center"
          >
            Server Error 500. Our staff has been notified, thank you for your
            understanding.
          </Typography>
        </motion.div>

        <Link className="block font-normal mt-48" to="/dashboards/project">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Error500Page;
