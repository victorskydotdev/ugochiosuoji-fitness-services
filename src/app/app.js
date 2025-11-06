import 'ldrs/ring';

import { waveform } from 'ldrs';
waveform.register();

import { marked } from 'marked';

marked.setOptions = {
	breaks: true,
	gfm: true,
};

const programBtns = document.querySelectorAll('.programs-btn'); // all "see programs" button elements
const learnMoreModal = document.querySelector('.learn-more-modal');

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
				if (!response.ok) return;

				const data = await response.json();
				console.log(data);

				// getting and mapping the media files for Contentful's images and media files
				const assets = data.data.includes.Asset;

				const categoryId = data.data.items.flatMap((item) =>
					item.metadata.tags.map((tag) => tag.sys.id)
				);

				// Render product cards
				productCards.forEach((card) => {
					const id = card.dataset.tagId;

					if (categoryId.includes(id)) {
						const matchedItems = data.data.items.filter((products) =>
							products.metadata.tags.some((tag) => tag.sys.id === id)
						);

						const productWithImages = matchedItems.map((item) => {
							const f = item.fields;
							const imageLinkId = f.productImage?.[0]?.sys?.id;
							const asset = assets.find((a) => a.sys.id === imageLinkId);
							const imageUrl = asset ? `https:${asset.fields.file.url}` : null;

							return {
								id: item.sys.id,
								title: f.productTitle,
								description: f.productDescription,
								price: f.productPrice,
								slug: f.slug,
								image: imageUrl,
							};
						});

						sessionStorage.setItem('storeProducts', productWithImages);

						// Insert products into DOM
						card.innerHTML = productWithImages
							.map(
								(product) => `
            <div class="container" data-category="${id}">
              <div class="img-wrap">
                <img src="${product.image}" alt="${product.title}" />
              </div>
              <div class="text-wrap">
                <h1>${product.title}</h1>
                

                <p class="price">N${product.price || ''}</p>

                <div class="btn-wrap">
                  <button class="program-select-btn" 
										data-product-title="${product.title}" 
										data-product-price="${product.price}" 
										data-product-id="${product.id}">
										Buy program
									</button>

                  <button class="learn-more-btn" data-product-title="${
										product.title
									}" 
										data-product-price="${product.price}"  data-product-id="${
									product.id
								}">Learn more</button>
                </div>
              </div>
            </div>
          `
							)
							.join('');
					}
				});

				document.addEventListener('click', (e) => {
					const learnMoreBtn = e.target.closest('.learn-more-btn');

					if (!learnMoreBtn && !learnMoreModal) return;

					// fetch button id
					const productId = learnMoreBtn.dataset.productId;

					const clickedProdId = data.data.items.find((item) => {
						return item.sys.id === productId;
					});

					if (clickedProdId) {
						console.log('✅ Found matching product:', clickedProdId);

						const productTitle = clickedProdId.fields.productTitle;
						const productDescription = marked(
							clickedProdId.fields.productDescription
						);
						const productImage = clickedProdId.fields.productImage;

						const moreInfoTemplate = (e) => {
							return `
								<div class='container'>
									
									
									<div class='wrap'>
										<h3 class='heading'>${productTitle}</h3>

										<div class='info'>${productDescription}</div>

										<div class="btn-wrap">
											<button class="modal-close-btn">
												<!-- <i class="fa-solid fa-xmark"></i> -->
												Continue shopping
											</button>
										</div>
									</div>

									
								</div>
							`;
						};

						learnMoreModal.classList.add('show-more-info');

						setTimeout(() => {
							learnMoreModal.innerHTML = moreInfoTemplate();

							const closeBtn = document.querySelector('.modal-close-btn');

							if (closeBtn) {
								closeBtn.addEventListener('click', () => {
									learnMoreModal.innerHTML = '';

									setTimeout(() => {
										learnMoreModal.classList.remove('show-more-info');
									}, 1000);
								});
							}
						}, 1000);
					} else {
						console.log('❌ No product found for ID:', productId);
					}
				});

				// we are attaching a single click logic using event delegation
				document.addEventListener('click', (e) => {
					const buyButton = e.target.closest('.program-select-btn');

					if (!buyButton) return;

					const productName = buyButton.dataset.productTitle;
					const productPrice = parseInt(buyButton.dataset.productPrice);
					const productId = buyButton.dataset.productId;

					// form logic goes here, which would appear first to collect the necessary data like email address to send to admin email after payment has been successful

					const paymentFormModal = document.querySelector(
						'.payment-form-modal'
					);

					// show form modal when the buy program button is clicked
					paymentFormModal.classList.add('show-payment-form');

					// payment form which is nested inside the payment modal
					const paymentForm = document.querySelector('.payment-form');
					const submitBtn = document.querySelector('.payment-btn-wrap');

					// trigger user info collection onSubmit and then store it to be used after payments have been made
					if (!paymentForm) return;
					paymentForm.addEventListener('submit', (event) => {
						event.preventDefault();

						const formData = new FormData(event.target);

						const jsonData = {};

						for (const [key, value] of formData.entries()) {
							jsonData[key] = value;
						} // form info are being stored up using jsonData{} to be submitted after payments

						const loaderTemplate = () => {
							return `
								<div class="btn-wrap">
									<button class="btn">
										<div class="container">
											<div class="bar"></div>
											<div class="bar"></div>
											<div class="bar"></div>
											<div class="bar"></div>
										</div>
									</button>
								</div>
							`;
						};

						submitBtn.innerHTML = loaderTemplate();

						// payment notification endpoint
						const endpoint = `/.netlify/functions/prod-purchase-notification`;

						const clientEmail = jsonData.email; // storing client email as we would use it with regards to initializing payment

						const initializePayment = async (e) => {
							if (paymentFormModal && buyButton) {
								const email = clientEmail;
								const amount = productPrice;

								const response = await fetch('/.netlify/functions/payments', {
									method: 'POST',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({ email, amount }),
								});

								const fetchedData = await response.json();
								// console.log(fetchedData?.data);
								// console.log(fetchedData?.publicKey);
								// console.log(
								// 	'this is the fetchedData payment authorization status:',
								// 	fetchedData.data.authorization_url
								// );

								// fetchedData.status && fetchedData.data.authorization_url

								if (fetchedData) {
									const handler = PaystackPop.setup({
										key: fetchedData?.publicKey, // Your Paystack PUBLIC key
										email: email,
										amount: amount * 100,
										ref: fetchedData.data.reference, // Use reference from backend

										callback: function (response) {
											console.log('Payment complete!', response);

											// Optionally verify payment here
											// alert(
											// 	'Payment successful! Reference: ' + response.reference
											// );

											const sendFormData = async (e) => {
												console.log(
													'Json data from the payment notification logic:',
													jsonData
												);
												try {
													const response = await fetch(endpoint, {
														method: 'POST',
														headers: {
															'Content-Type': 'application/json',
														},

														body: JSON.stringify(jsonData),
													});

													if (!response.ok) {
														alert(
															'Form not submitted. Call this number to validate your order'
														);
													} else {
														alert('Your order is complete!');

														window.location.href = '/';
													}
												} catch (error) {
													console.log('Error:', error);
												}
											};

											sendFormData();
										},

										onClose: function () {
											alert('Transaction was not completed, window closed.');
										},
									});

									handler.openIframe();
								} else console.error('Payment logic not working');
							}
						};

						initializePayment();
					});
				});
			} catch (error) {
				console.log('error:', error);
			}
		});
	}
};

triggerProducts();
