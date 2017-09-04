<template lang="jade">
	.row
		div(v-for="(item, index) in sortCatalog", :class="item.sizeWrapProduct", v-if="item.main")
			.product.product--main
				.product__item.product__item--left
					.product__img.product__img--main
						img(:src='item.image | withImage', alt='')
				.product__item.product__item--right
					.product__name.product__name--main {{ item.name }}
					.product__description--main <strong>Описание</strong>: <br> {{ item.description }}
					.product__price--main <strong> {{ item.price }}.00 {{ item.amount }}</strong>
					.product__sale.product__sale--main {{ item.sale | setSale }}%
					.product__compare
						.product-compare__header <i class="search icon"></i><b>Цены в других магазинах</b>
						.product-compare__item(v-if="item.price__lerua") <img src="img/ico__lerua.jpg" alt="" /> <i>Леруа:</i> {{item.price__lerua}} {{item.amount}}
						.product-compare__item(v-if="item.price__obi") <img src="img/ico__obi.jpg" alt="" /> <i>Оби:</i> {{item.price__obi}} {{item.amount}}
						.product-compare__item(v-if="item.price__krauta") <img src="img/ico__krauta.jpg" alt="" /> <i>К-раута:</i> {{item.price__krauta}} {{item.amount}}
						.product-compare__item(v-if="item.price__kastorama") <img src="img/ico__kastorama.jpg" alt="" /> <i>Касторама:</i> {{item.price__kastorama}} {{item.amount}}
						.product-compare__item(v-if="item.price__middle") <i>Средняя цена:</i> {{item.price__middle}} {{item.amount}}
					button.product__button {{item.canAddText}}
					.product__benefits
						img(src="img/benefit.jpg" alt="")
		div(v-else, :class="item.sizeWrapProduct")
			.product
				.product__item
					.product__sale(v-if="item.sale > 0") Скидка {{ item.sale | setSale }}%
					.product__name {{item.name}}
					.product__img
						img(:src='item.image | withImage', alt='')
					.product__number {{item.number}}
					.product__text(:data-tooltip='item.text | checkoutText' data-inverted="" data-position="bottom center") Характеристики <i class="info circle icon"></i>
					.product__price
						.product__price--old {{item.price | deleteLastSymb}}.00 руб.
						.product__price--new {{item.price | deleteLastSymb(item.sale)}}.00 руб.
						.product__price--costm {{item.costm | withCostm(item.sale) }}
					button.product__button.text-center <i class="shop icon"></i> {{item.canAddText}}
	
</template>

<script>
	import axios from 'axios'
	
	export default {
		name: 'CatalogList',
		props: [
			'propCatalogList',
			'propIdCategory',
			'propIdSubCategory'
		],
		data: function () {
			return {
				
				// выгруженный с помощью loadCatalog список товаров
				catalogUploaded: [],
				
				// отрендеренный на странице список товаров
				catalogRender: [],
				
				// допустимое количество отрендеренных товаров
				countProductRender: 18
				
			}
		},
		mounted() {
			this.loadCatalog();
		},
		computed: {

			// сортировка каталога
			sortCatalog() {
				let result   = [],
					  catalog  = this.catalogUploaded,
					  count    = this.countProductRender;

				// получение списка уже добавленных товаров
				let storage    = localStorage.orderCatalog,
						storageArr = [];

				// сортировка по проценту скидки
				catalog.sort(function(a,b) {
					if (a.sale > b.sale) { return -1; }
					if (a.sale < b.sale) { return 1; }
					return 0;
				});

				// ограничение количества товаров на одной странице
				catalog.forEach((i,index) => {
					if ( index < count ) {
						
						// добавляем свойства к каждому товару
						this.addPropToCardProduct(false,i);
						
						if (storage) {
							storageArr = JSON.parse(storage);
							storageArr.forEach((y) => {
								if (i.number === y.number) {
									
									// добавляем свойства к продуктовой карточке каталога
									this.addPropToCardProduct(true,i);
									
								}
							})
						}
						result.push(i);
					}
				});


				return result;
			},
			
			idCategory() {
				let id = this.propIdCategory;
				this.loadCatalog();
				return id
			}
			
		},
		methods: {
			/*goModal : function(e) {
					let target = e.target;
					if (target.classList.contains('noCanAdd')) return;
					/!* Деактивируем кнопку *!/
					target.classList.add('noCanAdd');
					target.textContent = 'Товар в корзине';
					/!* end *!/
					this.cart.push(this.myjson[e.target.dataset.id]);
					this.cart.forEach( (i) => i.count = 1);
					/!* Добавляем товар в Local Storage *!/
					if (localStorage.orderCatalog) {
							let currentLocalStorage = JSON.parse(localStorage.orderCatalog) || [];
							let cart = this.cart;
							let arr = currentLocalStorage.concat(cart);
							let newArr = arr
									.sort((a,b) => {
											return (a.number > b.number) ? 1 : -1;
									})
									.filter( (i, index) => {
											if (index + 1 >= arr.length) return true;
											let a = i.number;
											let b = arr[index+1].number || '';
											return (a !== b);
									});
							console.log(newArr);
							this.cart = newArr;
							localStorage.setItem('orderCatalog', JSON.stringify(newArr));
					} else {
							localStorage.setItem('orderCatalog', JSON.stringify(this.cart));
					}
					/!* end *!/
					this.$root.eventHub.$emit('orderCatalog', this.cart);
			},*/
			
			// ВНУТРЕННИЕ МЕТОДЫ
			
			// метод загрузки товаров из JSON
			loadCatalog : function() {
				let countProductRender = this.countProductRender;
				
				// в зависимости от урла получаем строку с нужным jsonFile
				let jsonFile = (this.propIdSubCategory) ?
					this.propCatalogList[this.propIdCategory].category[this.propIdSubCategory].jsonFile :
					this.propCatalogList[this.propIdCategory].jsonFile;
				
				// загружаем товары в catalogUploaded
				axios.get(jsonFile)
					.then((response) => {
							this.catalogUploaded = response.data;
							this.canAddRendersProducts(response.data, countProductRender)
						},
						(err) => {
							console.log(err)
						}
					)
			},
			
			// метод добавления свойств к продуктовой карточке каталога
			addPropToCardProduct: function (isStorage, i) {
				if (isStorage) {
					i.canAdd = 'noCanAdd';
					i.canAddText = 'Товар в корзине';
				} else {
					i.canAdd = 'canAdd';
					i.canAddText = 'Добавить в корзину';
					i['sizeWrapProduct'] = (i.hasOwnProperty('main')) ? 'col-sm-12' : 'col-sm-4';
				}
			},
			
			
			// UI МЕТОДЫ
			
			// проверяем, есть ли еще товар для рендеринга
			canAddRendersProducts : function (jsonFile, validCount) {
				if (jsonFile.length < validCount) {
					let button = document.querySelector('.product__add');
					button.classList.add('hidden');
				} else {
					let button = document.querySelector('.product__add');
					button.classList.remove('hidden');
				}
			}
			
		},
		filters: {

			// проверка на наличие фотографии у карточки
			withImage(val) {
				if (val.includes('no_photo')) { return 'img/no_image.png'; }
				return val;
			},

			// устанавливаем скидку
			setSale(val) {
				return (val * 100).toFixed(0);
			},

			// устанавливаем старую цену
			setOldPrice(val,k) {
				return (k !== undefined) ? (val * (1 - k)).toFixed(2) : (val) ;
			},
		}
	}
</script>
