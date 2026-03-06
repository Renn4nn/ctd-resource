import type { SVGProps, SVGWrapperProps } from '../../types'

function SVGWrapper({
	children,
	title,
	xmlns = 'http://www.w3.org/2000/svg',
	fill = '#e3e3e3',
	width = '24px',
	height = '24px',
	viewBox = '0 -960 960 960',
	className = '',
	...props
}: SVGWrapperProps) {
	return (
		<svg
			xmlns={xmlns}
			fill={fill}
			width={width}
			height={height}
			viewBox={viewBox}
			className={className}
			{...props}
		>
			<title>{title}</title>
			{children}
		</svg>
	)
}

export function Robot2Svg({
	className = '',
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<SVGWrapper title="Robot2" className={className} {...props}>
			<path d="M160-120v-200q0-33 23.5-56.5T240-400h480q33 0 56.5 23.5T800-320v200H160Zm200-320q-83 0-141.5-58.5T160-640q0-83 58.5-141.5T360-840h240q83 0 141.5 58.5T800-640q0 83-58.5 141.5T600-440H360ZM240-200h480v-120H240v120Zm120-320h240q50 0 85-35t35-85q0-50-35-85t-85-35H360q-50 0-85 35t-35 85q0 50 35 85t85 35Zm28.5-91.5Q400-623 400-640t-11.5-28.5Q377-680 360-680t-28.5 11.5Q320-657 320-640t11.5 28.5Q343-600 360-600t28.5-11.5Zm240 0Q640-623 640-640t-11.5-28.5Q617-680 600-680t-28.5 11.5Q560-657 560-640t11.5 28.5Q583-600 600-600t28.5-11.5ZM480-200Zm0-440Z" />
		</SVGWrapper>
	)
}

export function ArrowDownSvg({
	className = '',
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<SVGWrapper title="ArrowDown" className={className} {...props}>
			<path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
		</SVGWrapper>
	)
}

export function AttachFileSvg({
	className = '',
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<SVGWrapper title="AttachFile" className={className} {...props}>
			<path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z" />
		</SVGWrapper>
	)
}

export function SendSvg({ className = '', ...props }: SVGProps<SVGSVGElement>) {
	return (
		<SVGWrapper title="Send" className={className} {...props}>
			<path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
		</SVGWrapper>
	)
}
