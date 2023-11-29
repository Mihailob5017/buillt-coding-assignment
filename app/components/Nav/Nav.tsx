'use client';

import LogoImage from '../../../public/logo.svg';
import { useSelector } from '@/lib/redux';
/* Instruments */

import styles from './Nav.module.css';
import Link from 'next/link';
import Image from 'next/image';
export const Nav = () => {
	const { cart_count } = useSelector((state) => state.items);
	return (
		<nav className={styles.nav}>
			<h1 className={styles.nav__title}>
				<Image alt='logo' src={LogoImage} />
			</h1>
			<Link href='/cart'>
				<div className={styles.cart_container}>
					<p>{cart_count}</p>
					<img
						width='40'
						height='40'
						src='https://img.icons8.com/ios/50/shopping-cart--v1.png'
						alt='shopping-cart--v1'
					/>
				</div>
			</Link>
		</nav>
	);
};
