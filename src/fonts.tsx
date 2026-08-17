import React from 'react';
import {staticFile} from 'remotion';

export const FONT_FAMILY = 'Poppins';

export const FontFaces: React.FC = () => (
	<style>{`
		@font-face {
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 300;
			src: url('${staticFile('fonts/poppins-latin-300-normal.woff2')}') format('woff2');
		}
		@font-face {
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 400;
			src: url('${staticFile('fonts/poppins-latin-400-normal.woff2')}') format('woff2');
		}
		@font-face {
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 500;
			src: url('${staticFile('fonts/poppins-latin-500-normal.woff2')}') format('woff2');
		}
		@font-face {
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 600;
			src: url('${staticFile('fonts/poppins-latin-600-normal.woff2')}') format('woff2');
		}
	`}</style>
);
