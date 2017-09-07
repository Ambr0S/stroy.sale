<template lang="jade">
	.row
		div(v-for="(item, index) in sortCatalog", :class="item.sizeWrapProduct", v-if="item.main", :key="item.id")
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
					button.ui.primary.button.product__button.button--green.text-center(:data-id='index', @click="addToCart", :class="item.canAdd")
						i.big.shop.icon(v-if='item.canAdd == "canAdd"')
						i.big.check.circle.outline.icon(v-if='item.canAdd != "canAdd"')
						span {{item.canAddText}}
					.product__benefits
						img(src="img/benefit.jpg" alt="")
		div(v-else, :class="item.sizeWrapProduct", :key="item.id")
			.product(@mousemove="tester", @mouseleave="testerEnd")
				.product__item
					.product__sale(v-if="item.sale > 0") Скидка {{ item.sale | setSale }}%
					.product__name {{item.name}}
					.product__img
						img(:src='item.image | withImage', alt='')
					.product__number {{item.number}}
					//.product__text(:data-tooltip='item.text | checkoutText' data-inverted="" data-position="bottom center") Характеристики <i class="info circle icon"></i>
					.product__price
						.product__price--old {{ item.price }}.00 руб.
						.product__price--new {{ item.price }}.00 руб.
						.product__price--costm {{ item.costm }}
					button.ui.button.product__button.button--green.text-center(:data-id='index', @click="addToCart", :class="item.canAdd")
						i.big.shop.icon(v-if='item.canAdd == "canAdd"')
						i.big.check.circle.outline.icon(v-if='item.canAdd != "canAdd"')
						span {{item.canAddText}}
		.col-sm-12
			.product__add
				button.button--orange.ui(@click="addCountProductRender") <i class="arrow down icon"></i> Показать ещё...
</template>

<script>
	import axios from 'axios'

	export default {
		name    : 'CatalogListComponent',
		props   : [
			'propCatalogList',
			'propIdCategory',
			'propIdSubCategory'
		],
		data    : function () {
			return {
				
				// выгруженный с помощью loadCatalog список товаров
				catalogUploaded: [],
				
				// отрендеренный на странице список товаров
				catalogRender: [],
				
				// количество отрендеренных товаров
				countProductRender: 18,
				
				// список товаров в корзине
				cartList: []
				
			}
		},
		mounted() {
			
			// загружаем каталог при открытии страницы
			this.loadCatalog();
			
		},
		watch   : {

			// обновляем данные при изменении урла
			propIdCategory : function () {
				this.countProductRender = 18;
				this.loadCatalog();
			},
			propIdSubCategory : function() {
				this.countProductRender = 18;
				this.loadCatalog();
			}
			
		},
		computed: {

			// - отсортированный каталог
			sortCatalog() {
				let result   = [],
					  catalog  = this.catalogUploaded,
					  count    = this.countProductRender;

				// -/- получение списка уже добавленных товаров
				let storage    = localStorage.cartList,
						storageArr = [];

				// -/- сортировка по проценту скидки
				catalog.sort(function(a,b) {
					if (a.sale > b.sale) { return -1; }
					if (a.sale < b.sale) { return 1; }
					return 0;
				});

				// -/- ограничение количества товаров на одной странице
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
			
		},
		methods : {
			
			tester: function (e) {
				let target = e.currentTarget;
				let button = target.querySelector('.button');
				button.classList.add('primary');
				button.style.cssText = `
					transform: scale(1.1);
				`
			},
			testerEnd: function (e) {
				let target = e.currentTarget;
				let button = target.querySelector('.button');
				button.classList.remove('primary');
				button.style.cssText = `
					transform: scale(1);
				`
			},
			
			
			/* ВНУТРЕННИЕ МЕТОДЫ */
			
			// Метод загрузки товаров из JSON
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
			
			// - Метод добавления свойств к продуктовой карточке каталога
			addPropToCardProduct: function (isStorage, i) {
				if (isStorage) {
					i.canAdd = 'noCanAdd secondary';
					i.canAddText = 'Товар в корзине';
				} else {
					i.canAdd = 'canAdd';
					i.canAddText = 'Добавить в корзину';
					
					// -/- в зависимости от важности продукта подгружаем нужный размер обёртки
					i['sizeWrapProduct'] = (i.hasOwnProperty('main')) ? 'col-xs-12' : 'col-md-4 col-sm-6';
				}
			},
			
			// Увеличение лимита товаров на странице
			addCountProductRender: function () {
				this.countProductRender += 18;
			},

			
			/* UI МЕТОДЫ */
			
			// Проверяем, есть ли еще товар для рендеринга
			canAddRendersProducts : function (jsonFile, validCount) {
				if (jsonFile.length < validCount) {
					let button = document.querySelector('.product__add');
					button.classList.add('hidden');
				} else {
					let button = document.querySelector('.product__add');
					button.classList.remove('hidden');
				}
			},
			
			// - Метод добавления товара в корзину
			addToCart: function (e) {
				
				// -/- текущая кнопка
				let target = e.target;
				
				// -/- если товар уже добавлен в корзину, то возврат
				if (target.classList.contains('noCanAdd')) return;

				// -/- деактивация кнопки на выбранном продукте
				target.classList.add('noCanAdd secondary');
				target.textContent = 'Товар в корзине';
				
				// -/- добавление в корзину выбранный продукт
				this.cartList.push(this.sortCatalog[e.target.dataset.id]);
				
				// -/- устанавливаем количество единиц у выбранного продукта
				this.cartList.forEach( (i) => i.count = 1);
				
				// -/- отправка события корневому родителю
				this.$root.eventHub.$emit('carter', this.cartList);

				// -/- добавляем товар в Local Storage
				if (localStorage.hasOwnProperty('cartList')) {
					
					// --/-- получаем текущий Local Storage
					let _localStorage = JSON.parse(localStorage.cartList) || [];
					
					// --/-- получаем текущую корзину
					let cartList = this.cartList;
					
					// --/-- объединяем локал сторедж и текущую корзину
					let fullCartList = _localStorage.concat(cartList);
					
					// --/-- сортируем и фильтруем полную корзину
					let wrapFullCartList = fullCartList
						.sort((a,b) => {
							return (a.number > b.number) ? 1 : -1;
						})
						.filter( (i, index) => {
							if (index + 1 >= fullCartList.length) return true;
							let a = i.number;
							let b = fullCartList[index+1].number || '';
							return (a !== b);
						});
					
					this.cartList = wrapFullCartList;
					
					// --/-- обновляем корзину в Local Storage
					localStorage.setItem('cartList', JSON.stringify(wrapFullCartList));
					
				} else {
					localStorage.setItem('cartList', JSON.stringify(this.cartList));
				}
			}
			
		},
		filters : {

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
			}
			
		}
	}
</script>
