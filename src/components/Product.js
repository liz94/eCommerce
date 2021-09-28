import React from 'react';
import { Grid, Image, Card } from 'semantic-ui-react';
import CardImage from '../assets/temp.jpg';
import { useEffect, useState } from 'react';
import styles from './Product.module.css';

export default function Product() {
	const getData = () => {
		fetch('data.json', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				setData(myJson);
			});
	};

	const [data, setData] = useState([]);
	const [category, setCategory] = useState('all');
	const [searchParam] = useState(['productName']);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		getData();
	}, []);

	//search for items using productName and filter products based on type
	function filterProducts(items) {
		return items.filter((item) => {
			if (item.type === category) {
				return searchParam.some((newItem) => {
					return (
						item[newItem]
							.toString()
							.toLowerCase()
							.indexOf(searchValue.toLowerCase()) > -1
					);
				});
			} else if (category === 'all') {
				return searchParam.some((newItem) => {
					return (
						item[newItem]
							.toString()
							.toLowerCase()
							.indexOf(searchValue.toLowerCase()) > -1
					);
				});
			}
		});
	}

	return (
		<div>
			<Grid>
				<Grid.Column computer={8} tablet={8} mobile={16}>
					<div className={styles.searchDesign}>
						<input
							type='search'
							name='search-form'
							id='search-form'
							placeholder='Search for...'
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
						/>
					</div>
				</Grid.Column>
				<Grid.Column computer={8} tablet={8} mobile={16}>
					<div className={styles.filterDesign}>
						<select
							name='category'
							id='category'
							onChange={(e) => {
								setCategory(e.target.value);
							}}
						>
							<option value='all'>All</option>
							<option value='Wine'>Wine</option>
							<option value='Beer'>Beer</option>
							<option value='Spirits'>Spirits</option>
						</select>
					</div>
				</Grid.Column>
			</Grid>
			<Grid>
				{filterProducts(data).map((item, index) => {
					return (
						<Grid.Column computer={4} tablet={8} mobile={16} key={index}>
							<Card>
								{item.isSale ? (
									<Image
										fluid
										label={{
											as: 'a',
											color: 'red',
											content: 'Sale',
											ribbon: true,
										}}
										src={item.productImage}
										alt={item.productName}
									/>
								) : (
									<Image fluid src={item.productImage} alt={item.productName} />
								)}

								<Card.Content
									description={item.productName}
									className={styles.productName}
								/>
								<Card.Content extra>{item.price}</Card.Content>
							</Card>
						</Grid.Column>
					);
				})}
			</Grid>
		</div>
	);
}
