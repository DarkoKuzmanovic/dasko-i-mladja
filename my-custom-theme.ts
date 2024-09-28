
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "24px",
		"--theme-rounded-container": "24px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "255 255 255",
		"--on-success": "0 0 0",
		"--on-warning": "255 255 255",
		"--on-error": "255 255 255",
		"--on-surface": "0 0 0",
		// =~= Theme Colors  =~=
		// primary | #4e9ab7 
		"--color-primary-50": "228 240 244", // #e4f0f4
		"--color-primary-100": "220 235 241", // #dcebf1
		"--color-primary-200": "211 230 237", // #d3e6ed
		"--color-primary-300": "184 215 226", // #b8d7e2
		"--color-primary-400": "131 184 205", // #83b8cd
		"--color-primary-500": "78 154 183", // #4e9ab7
		"--color-primary-600": "70 139 165", // #468ba5
		"--color-primary-700": "59 116 137", // #3b7489
		"--color-primary-800": "47 92 110", // #2f5c6e
		"--color-primary-900": "38 75 90", // #264b5a
		// secondary | #E2894B 
		"--color-secondary-50": "251 237 228", // #fbede4
		"--color-secondary-100": "249 231 219", // #f9e7db
		"--color-secondary-200": "248 226 210", // #f8e2d2
		"--color-secondary-300": "243 208 183", // #f3d0b7
		"--color-secondary-400": "235 172 129", // #ebac81
		"--color-secondary-500": "226 137 75", // #E2894B
		"--color-secondary-600": "203 123 68", // #cb7b44
		"--color-secondary-700": "170 103 56", // #aa6738
		"--color-secondary-800": "136 82 45", // #88522d
		"--color-secondary-900": "111 67 37", // #6f4325
		// tertiary | #78C2BD 
		"--color-tertiary-50": "235 246 245", // #ebf6f5
		"--color-tertiary-100": "228 243 242", // #e4f3f2
		"--color-tertiary-200": "221 240 239", // #ddf0ef
		"--color-tertiary-300": "201 231 229", // #c9e7e5
		"--color-tertiary-400": "161 212 209", // #a1d4d1
		"--color-tertiary-500": "120 194 189", // #78C2BD
		"--color-tertiary-600": "108 175 170", // #6cafaa
		"--color-tertiary-700": "90 146 142", // #5a928e
		"--color-tertiary-800": "72 116 113", // #487471
		"--color-tertiary-900": "59 95 93", // #3b5f5d
		// success | #a6d96a 
		"--color-success-50": "242 249 233", // #f2f9e9
		"--color-success-100": "237 247 225", // #edf7e1
		"--color-success-200": "233 246 218", // #e9f6da
		"--color-success-300": "219 240 195", // #dbf0c3
		"--color-success-400": "193 228 151", // #c1e497
		"--color-success-500": "166 217 106", // #a6d96a
		"--color-success-600": "149 195 95", // #95c35f
		"--color-success-700": "125 163 80", // #7da350
		"--color-success-800": "100 130 64", // #648240
		"--color-success-900": "81 106 52", // #516a34
		// warning | #fdae61 
		"--color-warning-50": "255 243 231", // #fff3e7
		"--color-warning-100": "255 239 223", // #ffefdf
		"--color-warning-200": "255 235 216", // #ffebd8
		"--color-warning-300": "254 223 192", // #fedfc0
		"--color-warning-400": "254 198 144", // #fec690
		"--color-warning-500": "253 174 97", // #fdae61
		"--color-warning-600": "228 157 87", // #e49d57
		"--color-warning-700": "190 131 73", // #be8349
		"--color-warning-800": "152 104 58", // #98683a
		"--color-warning-900": "124 85 48", // #7c5530
		// error | #d7191c 
		"--color-error-50": "249 221 221", // #f9dddd
		"--color-error-100": "247 209 210", // #f7d1d2
		"--color-error-200": "245 198 198", // #f5c6c6
		"--color-error-300": "239 163 164", // #efa3a4
		"--color-error-400": "227 94 96", // #e35e60
		"--color-error-500": "215 25 28", // #d7191c
		"--color-error-600": "194 23 25", // #c21719
		"--color-error-700": "161 19 21", // #a11315
		"--color-error-800": "129 15 17", // #810f11
		"--color-error-900": "105 12 14", // #690c0e
		// surface | #202124 
		"--color-surface-50": "222 222 222", // #dedede
		"--color-surface-100": "210 211 211", // #d2d3d3
		"--color-surface-200": "199 200 200", // #c7c8c8
		"--color-surface-300": "166 166 167", // #a6a6a7
		"--color-surface-400": "99 100 102", // #636466
		"--color-surface-500": "32 33 36", // #202124
		"--color-surface-600": "29 30 32", // #1d1e20
		"--color-surface-700": "24 25 27", // #18191b
		"--color-surface-800": "19 20 22", // #131416
		"--color-surface-900": "16 16 18", // #101012
		
	}
}