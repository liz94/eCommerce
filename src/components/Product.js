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
	useEffect(() => {
		getData();
	}, []);

	const [data, setData] = useState([]);

	return (
		<div>
			<Grid>
				{data.map((item, index) => {
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
										src={CardImage}
										alt={item.productName}
									/>
								) : (
									<Image fluid src={CardImage} alt={item.productName} />
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
