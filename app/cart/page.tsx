'use client';
import { Nav } from '../components/Nav/Nav';
import styles from './cart.module.css';
import { useSelector } from '@/lib/redux';
import CartItem from '../components/CartItem/CartItem';
import * as messages from './cart.messages';
const Cart = () => {
	const state = useSelector((state) => state.items);

	const addDotFn = (num: number) => {
		let str = num.toString();
		if (str.length < 4) return str;
		let newStr = '';
		let counter = 0;
		for (let i = str.length - 1; i >= 0; i--) {
			newStr += str[i];
			counter++;
			if (counter === 3) {
				newStr += '.';
				counter = 0;
			}
		}
		return newStr.split('').reverse().join('');
	};

	return (
		<>
			<Nav />
			<div className={styles.cart_container}>
				<div className={styles.items_container}>
					<h2>Tvoja korpa</h2>
					{state.cart.map((item) => (
						<CartItem key={item.id} {...item} />
					))}
				</div>
				<div className={styles.total_container}>
					<h1 className={styles.total_head}>Tvoja narudzbina</h1>
					<div className={styles.total_row}>
						<p className={styles.total_text}>Ukupno</p>
						<p className={styles.price_wrapper}>
							<label>{addDotFn(state.sum)}</label>
							<label>RSD</label>
						</p>
					</div>
					<div className={styles.total_row}>
						<p className={styles.total_text}>Usteda</p>
						<p className={styles.price_wrapper}>
							<label>-{addDotFn(state.saved)}</label>
							<label>RSD</label>
						</p>
					</div>
					<div className={styles.total_row}>
						<p className={styles.total_text}>{messages.deliver}</p>
						<p className={styles.price_wrapper}>
							<label>Besplatna</label>
						</p>
					</div>
					<div className={styles.br} />
					<div className={styles.total_row}>
						<p className={styles.total_text}>{messages.total}</p>
						<p className={styles.price_wrapper}>
							<label>{addDotFn(state.sum)}</label>
							<label>RSD</label>
						</p>
					</div>
					<p className={styles.final_text}>{messages.pdv}</p>

					<button className={styles.submit_btn}>{messages.payment}</button>
				</div>
			</div>
		</>
	);
};

export default Cart;
