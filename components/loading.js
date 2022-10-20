import React from 'react';
import styles from 'styles/loading.module.scss';
import ReactLoading from 'react-loading';

export default function Loading({ loading }){
  return (
		<>
			{loading && (
				<div className={styles.loading}>
					<ReactLoading
						className="spinningBubbles"
						type="spinningBubbles"
						width="150px"
						height="150px"
					/>
				</div>
			)}
		</>
	);
}
