import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

registerBlockType(metadata.name, {
	icon: {
		src:
				<svg width="20" height="20" viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M70.9 76.2455H5.34545C2.3939 76.2455 0 73.8516 0 70.9V5.34545C0 2.3939 2.3939 0 5.34545 0H70.9C73.8516 0 76.2455 2.3939 76.2455 5.34545V70.9C76.2455 73.8516 73.8516 76.2455 70.9 76.2455Z" fill="#29235C"/>
					<path d="M44.0745 14.8029H28.1813C27.8623 14.8029 27.6011 14.5442 27.6011 14.2227V12.3437C27.6011 12.0247 27.8598 11.7635 28.1813 11.7635H44.0745C44.3935 11.7635 44.6548 12.0222 44.6548 12.3437V14.2227C44.6523 14.5442 44.3935 14.8029 44.0745 14.8029Z" fill="url(#paint0_linear_1355_1437)"/>
					<path d="M66.8228 21.1105H28.1813C27.8623 21.1105 27.6011 20.8518 27.6011 20.5303V18.6513C27.6011 18.3323 27.8598 18.071 28.1813 18.071H66.8228C67.1418 18.071 67.4031 18.3298 67.4031 18.6513V20.5303C67.4005 20.8493 67.1418 21.1105 66.8228 21.1105Z" fill="url(#paint1_linear_1355_1437)"/>
					<path d="M61.1659 27.4155H28.1813C27.8623 27.4155 27.6011 27.1567 27.6011 26.8352V24.9563C27.6011 24.6373 27.8598 24.376 28.1813 24.376H61.1659C61.4849 24.376 61.7461 24.6347 61.7461 24.9563V26.8352C61.7461 27.1567 61.4874 27.4155 61.1659 27.4155Z" fill="url(#paint2_linear_1355_1437)"/>
					<path d="M55.5542 33.7206H28.1813C27.8623 33.7206 27.6011 33.4618 27.6011 33.1403V31.2614C27.6011 30.9423 27.8598 30.6811 28.1813 30.6811H55.5542C55.8732 30.6811 56.1344 30.9398 56.1344 31.2614V33.1403C56.1344 33.4618 55.8757 33.7206 55.5542 33.7206Z" fill="url(#paint3_linear_1355_1437)"/>
					<path d="M44.0745 45.562H28.1813C27.8623 45.562 27.6011 45.3032 27.6011 44.9817V43.1028C27.6011 42.7837 27.8598 42.5225 28.1813 42.5225H44.0745C44.3935 42.5225 44.6548 42.7812 44.6548 43.1028V44.9817C44.6523 45.3007 44.3935 45.562 44.0745 45.562Z" fill="url(#paint4_linear_1355_1437)"/>
					<path d="M66.8228 51.867H28.1813C27.8623 51.867 27.6011 51.6083 27.6011 51.2868V49.4078C27.6011 49.0888 27.8598 48.8275 28.1813 48.8275H66.8228C67.1418 48.8275 67.4031 49.0863 67.4031 49.4078V51.2868C67.4005 51.6083 67.1418 51.867 66.8228 51.867Z" fill="url(#paint5_linear_1355_1437)"/>
					<path d="M61.1659 58.1721H28.1813C27.8623 58.1721 27.6011 57.9134 27.6011 57.5918V55.7129C27.6011 55.3939 27.8598 55.1326 28.1813 55.1326H61.1659C61.4849 55.1326 61.7461 55.3914 61.7461 55.7129V57.5918C61.7461 57.9134 61.4874 58.1721 61.1659 58.1721Z" fill="url(#paint6_linear_1355_1437)"/>
					<path d="M55.5542 64.4771H28.1813C27.8623 64.4771 27.6011 64.2183 27.6011 63.8968V62.0179C27.6011 61.6988 27.8598 61.4376 28.1813 61.4376H55.5542C55.8732 61.4376 56.1344 61.6963 56.1344 62.0179V63.8968C56.1344 64.2183 55.8757 64.4771 55.5542 64.4771Z" fill="url(#paint7_linear_1355_1437)"/>
					<path d="M9.6586 11.766H23.6778C24.1275 11.766 24.4917 12.1302 24.4917 12.5798V14.5166C24.4917 14.9662 24.1275 15.3304 23.6778 15.3304H9.6586C9.20896 15.3304 8.84473 14.9662 8.84473 14.5166V12.5798C8.84473 12.1327 9.20896 11.766 9.6586 11.766Z" fill="#DADADA"/>
					<path d="M13.2108 16.9808H24.0273C24.2835 16.9808 24.492 17.1893 24.492 17.4455V18.6965C24.492 18.9527 24.2835 19.1612 24.0273 19.1612H13.2108C12.9546 19.1612 12.7461 18.9527 12.7461 18.6965V17.4455C12.7461 17.1893 12.9546 16.9808 13.2108 16.9808Z" fill="#DADADA"/>
					<path d="M9.6586 42.525H23.6778C24.1275 42.525 24.4917 42.8892 24.4917 43.3388V45.2756C24.4917 45.7252 24.1275 46.0894 23.6778 46.0894H9.6586C9.20896 46.0894 8.84473 45.7252 8.84473 45.2756V43.3388C8.84473 42.8892 9.20896 42.525 9.6586 42.525Z" fill="#DADADA"/>
					<path d="M13.2108 47.7399H24.0273C24.2835 47.7399 24.492 47.9484 24.492 48.2046V49.4556C24.492 49.7118 24.2835 49.9203 24.0273 49.9203H13.2108C12.9546 49.9203 12.7461 49.7118 12.7461 49.4556V48.2046C12.7461 47.9484 12.9546 47.7399 13.2108 47.7399Z" fill="#DADADA"/>
					<defs>
						<linearGradient id="paint0_linear_1355_1437" x1="27.6018" y1="13.2854" x2="44.6527" y2="13.2854" gradientUnits="userSpaceOnUse">
							<stop stop-color="#DADADA"/>
							<stop offset="0.3421" stop-color="#DCDCDC"/>
							<stop offset="0.5082" stop-color="#E4E4E4"/>
							<stop offset="0.636" stop-color="#F1F1F1"/>
							<stop offset="0.7235" stop-color="white"/>
							<stop offset="0.7538" stop-color="#F5F5F5"/>
							<stop offset="0.8164" stop-color="#E6E6E6"/>
							<stop offset="0.8899" stop-color="#DDDDDD"/>
							<stop offset="1" stop-color="#DADADA"/>
						</linearGradient>
						<linearGradient id="paint1_linear_1355_1437" x1="27.6018" y1="19.5913" x2="67.4014" y2="19.5913" gradientUnits="userSpaceOnUse">
							<stop stop-color="#DADADA"/>
							<stop offset="0.3421" stop-color="#DCDCDC"/>
							<stop offset="0.5082" stop-color="#E4E4E4"/>
							<stop offset="0.636" stop-color="#F1F1F1"/>
							<stop offset="0.7235" stop-color="white"/>
							<stop offset="0.7538" stop-color="#F5F5F5"/>
							<stop offset="0.8164" stop-color="#E6E6E6"/>
							<stop offset="0.8899" stop-color="#DDDDDD"/>
							<stop offset="1" stop-color="#DADADA"/>
						</linearGradient>
						<linearGradient id="paint2_linear_1355_1437" x1="27.6018" y1="25.8971" x2="61.7464" y2="25.8971" gradientUnits="userSpaceOnUse">
							<stop stop-color="#DADADA"/>
							<stop offset="0.3421" stop-color="#DCDCDC"/>
							<stop offset="0.5082" stop-color="#E4E4E4"/>
							<stop offset="0.636" stop-color="#F1F1F1"/>
							<stop offset="0.7235" stop-color="white"/>
							<stop offset="0.7538" stop-color="#F5F5F5"/>
							<stop offset="0.8164" stop-color="#E6E6E6"/>
							<stop offset="0.8899" stop-color="#DDDDDD"/>
							<stop offset="1" stop-color="#DADADA"/>
						</linearGradient>
						<linearGradient id="paint3_linear_1355_1437" x1="27.6018" y1="32.203" x2="56.1342" y2="32.203" gradientUnits="userSpaceOnUse">
							<stop stop-color="#DADADA"/>
							<stop offset="0.3421" stop-color="#DCDCDC"/>
							<stop offset="0.5082" stop-color="#E4E4E4"/>
							<stop offset="0.636" stop-color="#F1F1F1"/>
							<stop offset="0.7235" stop-color="white"/>
							<stop offset="0.7538" stop-color="#F5F5F5"/>
							<stop offset="0.8164" stop-color="#E6E6E6"/>
							<stop offset="0.8899" stop-color="#DDDDDD"/>
							<stop offset="1" stop-color="#DADADA"/>
						</linearGradient>
						<linearGradient id="paint4_linear_1355_1437" x1="27.6018" y1="44.0424" x2="44.6527" y2="44.0424" gradientUnits="userSpaceOnUse">
							<stop stop-color="#DADADA"/>
							<stop offset="0.3421" stop-color="#DCDCDC"/>
							<stop offset="0.5082" stop-color="#E4E4E4"/>
							<stop offset="0.636" stop-color="#F1F1F1"/>
							<stop offset="0.7235" stop-color="white"/>
							<stop offset="0.7538" stop-color="#F5F5F5"/>
							<stop offset="0.8164" stop-color="#E6E6E6"/>
							<stop offset="0.8899" stop-color="#DDDDDD"/>
							<stop offset="1" stop-color="#DADADA"/>
						</linearGradient>
						<linearGradient id="paint5_linear_1355_1437" x1="27.6018" y1="50.3483" x2="67.4014" y2="50.3483" gradientUnits="userSpaceOnUse">
							<stop stop-color="#DADADA"/>
							<stop offset="0.3421" stop-color="#DCDCDC"/>
							<stop offset="0.5082" stop-color="#E4E4E4"/>
							<stop offset="0.636" stop-color="#F1F1F1"/>
							<stop offset="0.7235" stop-color="white"/>
							<stop offset="0.7538" stop-color="#F5F5F5"/>
							<stop offset="0.8164" stop-color="#E6E6E6"/>
							<stop offset="0.8899" stop-color="#DDDDDD"/>
							<stop offset="1" stop-color="#DADADA"/>
						</linearGradient>
						<linearGradient id="paint6_linear_1355_1437" x1="27.6018" y1="56.6542" x2="61.7464" y2="56.6542" gradientUnits="userSpaceOnUse">
							<stop stop-color="#DADADA"/>
							<stop offset="0.3421" stop-color="#DCDCDC"/>
							<stop offset="0.5082" stop-color="#E4E4E4"/>
							<stop offset="0.636" stop-color="#F1F1F1"/>
							<stop offset="0.7235" stop-color="white"/>
							<stop offset="0.7538" stop-color="#F5F5F5"/>
							<stop offset="0.8164" stop-color="#E6E6E6"/>
							<stop offset="0.8899" stop-color="#DDDDDD"/>
							<stop offset="1" stop-color="#DADADA"/>
						</linearGradient>
						<linearGradient id="paint7_linear_1355_1437" x1="27.6018" y1="62.96" x2="56.1342" y2="62.96" gradientUnits="userSpaceOnUse">
							<stop stop-color="#DADADA"/>
							<stop offset="0.3421" stop-color="#DCDCDC"/>
							<stop offset="0.5082" stop-color="#E4E4E4"/>
							<stop offset="0.636" stop-color="#F1F1F1"/>
							<stop offset="0.7235" stop-color="white"/>
							<stop offset="0.7538" stop-color="#F5F5F5"/>
							<stop offset="0.8164" stop-color="#E6E6E6"/>
							<stop offset="0.8899" stop-color="#DDDDDD"/>
							<stop offset="1" stop-color="#DADADA"/>
						</linearGradient>
					</defs>
				</svg>
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
