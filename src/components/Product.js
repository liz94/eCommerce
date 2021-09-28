import React from 'react';
import { Grid, Image, Card } from 'semantic-ui-react';
import CardImage from '../assets/temp.jpg';
import { useEffect, useState } from 'react';

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
								<Image src={CardImage} alt={item.productName} />
								<Card.Content description={item.productName} />
								<Card.Content extra>{item.price}</Card.Content>
							</Card>
						</Grid.Column>
					);
				})}
			</Grid>
		</div>
	);
}
