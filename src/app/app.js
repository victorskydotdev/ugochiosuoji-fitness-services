const programBtns = document.querySelectorAll('.programs-btn'); // all "see programs" button elements

// function to redirect users and visitors to the programs page when the button is clicked
export const redirectToServicesPage = () => {
	if (programBtns) {
		programBtns.forEach((btn) => {
			btn.addEventListener('click', () => {
				window.location.href = '/programs';
			});
		});
	}
};

const triggerProducts = () => {
	// if (!cardsBtn) return;

	const serverEndPoint = `/.netlify/functions/fetch-product-data`;

	const productCards = document.querySelectorAll('.product-card');

	if (productCards) {
		window.addEventListener('DOMContentLoaded', async () => {
			try {
				const response = await fetch(serverEndPoint);

				if (!response.ok) {
					return;
				} else {
					const data = await response.json();
					console.log(data.data.items);

					const assets = data.data.includes.Asset;
					// console.log(`assets:`, assets);

					const categoryId = data?.data?.items?.flatMap((item) => {
						return item?.metadata?.tags?.map((tag) => tag.sys.id);
					});

					productCards.forEach((card, index) => {
						const id = card.dataset.tagId;

						// console.log(
						// 	'Category Id from Contentful:',
						// 	categoryId,
						// 	'data Id from the DOM:',
						// 	id
						// );

						if (categoryId.includes(id)) {
							const matchedItems = data.data.items.filter((products) => {
								return products.metadata.tags.some((tag) => tag.sys.id === id);
							});

							const productWithImages = matchedItems.map((item) => {
								const f = item.fields;
								const imageLinkId = f.productImage?.[0]?.sys?.id;

								// Find the matching asset to get the actual file URL
								const asset = assets.find((a) => a.sys.id === imageLinkId);
								const imageUrl = asset
									? `https:${asset.fields.file.url}`
									: null;

								return {
									id: item.sys.id,
									title: f.productTitle,
									description: f.productDescription,
									price: f.productPrice,
									slug: f.slug,
									image: imageUrl, // Correct URL from includes.Asset
									raw: item, // Keep raw entry if needed
								};
							});

							// console.log('products with images:', productWithImages);

							if (card) {
								card.innerHTML = productWithImages
									.map((product, index) => {
										return `
												<div class="container" data-category="${id}">
													<div class="img-wrap">
														<img src="${product.image}" alt="${product.title}" />
													</div>

													<div class="text-wrap">
														<h1>${product.title}</h1>

														<p class="description">${product.description || ''}</p>

														<p class="price">N${product.price || ''}</p>

														<div class="btn-wrap">
															<button data-btn-id="${index}" class="program-select-btn">Buy program</button>
															
															<button data-btn-id="${index}" class="learn-more-btn">Learn more</button>
														</div>
													</div>
												</div>
											`;
									})
									.join('');

								// declaring button variables to be able to trigger purchase and learn more functionalities on buttonClick events
								const buyProgBtn = document.querySelector(
									'.program-select-btn'
								);
								const learnMoreBtn =
									document.querySelectorAll('.learn-more-btn');
							} else {
								console.log('Nothing to show in the DOM');
							}
						}

						// document.addEventListener('click', (e) => {
						// 	const firstBtn = e.target.closest('.program-select-btn');
						// 	const secondBtn = e.target.closest('.learn-more-btn');

						// 	alert('Button clicked');
						// });

						let programClickHandler;

						function attachProgramClickHandler() {
							if (programClickHandler) {
								document.removeEventListener('click', programClickHandler);
							}

							programClickHandler = (e) => {
								const buyBtn = e.target.closest('.program-select-btn');
								const learnBtn = e.target.closest('.learn-more-btn');

								if (buyBtn) console.log('Buy:', buyBtn.dataset.btnId);
								if (learnBtn) console.log('Learn:', learnBtn.dataset.btnId);
							};

							document.addEventListener('click', programClickHandler);
						}

						attachProgramClickHandler();
					});
				}
			} catch (error) {
				console.log('error:', error);
			}
		});
	}
};

triggerProducts();
