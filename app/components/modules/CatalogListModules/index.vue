<template>
  <transition-group appear v-on:appear="scrollCatalog" class="row" tag="div">
    <div v-for="(item, index) in sortCatalog" :class="item.sizeWrapProduct" :key="index">
			<div class="product" @mousemove="hoverProduct" @mouseleave="hoverProduct">
				<div class="product__item">
					<div class="product__sale" v-if="item.sale > 0"> Скидка {{ item.sale | setSale }}%</div>
					<div class="product__name">{{item.name}}</div>
					<div class="product__primary product__transition">
						<div class="product__img">
							<img :src='item.img | withImage' alt=''>
						</div>
						<div class="product__number">Арт. {{ item.number }}</div>
						<button class="button ui basic black" v-if="(item.description1 !== '0' || item.description2 !== '0')" @click="openDescription">
							<i class="ui icon circle info"></i>
							<span v-if="(item.description1 !== '0')">Характеристики</span>
							<span v-if="(item.description1 !== '0' && item.description2 !== '0')">и описание</span>
							<span v-if="(item.description1 === '0' && item.description2 !== '0')">Описание</span>
						</button>
						<div class="product__price">
							<div class="product__price--old"> <span v-if="item.sale > 0">{{ item.price }}.00 руб.</span>  </div>
							<div class="product__price--new">{{ (item.price * ( 1 - item.sale )).toFixed(2) }} <i class="icon ruble small"></i></div>
						</div>
					</div>
					<div class="product__secondary product__transition">
						<button class="button ui basic black" @click="closeDescription"><i class="ui icon circle close"></i>Закрыть</button>
						<div class="product__description" v-if="item.description1 !== '0'"><strong>Характериcтики:</strong><br/>{{ item.description1 }}</div>
						<div class="product__description" v-if="item.description2 !== '0'"><strong>Описание:</strong><br/>{{ item.description2 }}</div>
					</div>
					<button class="ui button product__button button--green text-center" :data-id='index' @click="addToCart"  :class="item.canAdd">
						<i class="big shop icon" v-if='item.canAdd == "canAdd"'></i>
						<i class="big check circle outline icon" v-if='item.canAdd != "canAdd"'></i>
						<span>{{ item.canAddText }}</span>
					</button>
				</div>
			</div>
		</div>
		<div class="col-sm-12 text-center" v-if="countProductRender <= catalogUploaded.length">
			<div class="product__add">
				<button class="button--orange ui button secondary" @click="addCountProductRender">
					<i class="arrow down icon"></i> Показать ещё...
				</button>
			</div>
		</div>
  </transition-group>
</template>

<script>
	import axios from 'axios'
	import Vue from 'vue'

	
	export default {
		name    : 'CatalogListComponent',
		props   : [
			'propCatalogList',
			'propIdCategory',
			'propIdSubCategory',
			'propCartList'
		],
		data    : function () {
			return {
				
				// выгруженный с помощью loadCatalog список товаров
				catalogUploaded: [],
				
				// количество отрендеренных товаров
				countProductRender: 18,
				
				// список товаров в корзине
				cartList: [],
				_localStorage: []
				
			}
		},
		created() {
			
			// загружаем каталог при открытии страницы
			this.loadCatalog();
			
		},
		mounted() {

		},
		watch   : {

			// обновляем данные при изменении урла
			propIdCategory : function () {
				this.countProductRender = 18;
				this.loadCatalog();
				this.findElWithDesc(this.closeDescription)
			},
			propIdSubCategory : function() {
				this.countProductRender = 18;
				this.loadCatalog();
				this.findElWithDesc(this.closeDescription)
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
				/*catalog.sort(function(a,b) {
					if (a.sale > b.sale) { return -1; }
					if (a.sale < b.sale) { return 1; }
					return 0;
				});*/

				// -/- проверяем на наличие дублей
				catalog.forEach((i,index) => {
					if ( index < count ) {
						
						// добавляем свойства к каждому товару
						this.addPropToCardProduct(false,i);
						
						// если товар в корзине уже есть, то нужно ему проставить стили
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
							//this.canAddRendersProducts(response.data, countProductRender)
						},
						(err) => {
							console.log(err)
						}
					)
			},
			
			// - Метод добавления свойств к продуктовой карточке каталога
			addPropToCardProduct: function (isStorage, i) {
				if (isStorage) {
          Vue.set(i,'canAddText', 'Товар в корзине');
          Vue.set(i,'canAdd', 'noCanAdd secondary');
          Vue.set(i,'count', 1);
				} else {
					Vue.set(i,'canAddText', 'Добавить в корзину');
					Vue.set(i,'canAdd', 'canAdd');
          Vue.set(i,'count', 1);

					// -/- в зависимости от важности продукта подгружаем нужный размер обёртки
					i['sizeWrapProduct'] = (i.hasOwnProperty('main')) ? 'col-xs-12' : 'col-md-4 col-sm-6';
				}

			},
			
			// Увеличение лимита товаров на странице
			addCountProductRender: function () {
				this.countProductRender += 18;
			},

			
			/* UI МЕТОДЫ */
			
			// - Метод добавления товара в корзину
			addToCart: function (e) {

				// -/- текущая кнопка
				let target = e.currentTarget;
				let targetId = target.dataset.id;

				// -/- если товар уже добавлен в корзину, то переходим в корзину
				if (target.classList.contains('noCanAdd')) {
					this.$root._router.push({ path: '/cart' });
					return
				}

				// -/- деактивация кнопки на выбранном продукте
				target.classList.add('noCanAdd');
				target.classList.remove('canAdd');
				target.classList.add('secondary');
				target.innerHTML = '<i class="big check circle outline icon"></i> Товар в корзине';
				
				// -/- отправка события корневому родителю
				this.$emit('add', this.sortCatalog[targetId])
			},

			// Метод отображения и закрытия описания
			openDescription: function (e) {
				let target = e.currentTarget;
				let primary = target.closest('.product__primary');
				let secondary = primary.nextElementSibling;

				primary.classList.add('descriptionActive');
				primary.style.cssText = `
              transform : translate(120%,0);
				`;
				secondary.style.cssText = `
              transform : translate(0,0);
				`;
			},
			closeDescription: function (e) {
				// аргумент e может быть событием или dom-элементом
				
				let primary   = null,
					  secondary = null,
					  target 		= null;
				
				if (e.target) {
					target = e.currentTarget;
					secondary = target.closest('.product__secondary');
					primary = secondary.previousElementSibling;
				} else {
					primary = e;
					secondary = primary.nextElementSibling;
				}

				primary.classList.remove('descriptionActive');
				primary.style.cssText = `
              transform : translate(0,0);
				`;
				secondary.style.cssText = `
              transform : translate(-120%,0);
				`;
			},
			
			// Метод поиск элементов с активным описанием, и выполнения действия над ним
			findElWithDesc(fn) {
				let elWithActiveDesc = document.querySelectorAll('.descriptionActive');

				elWithActiveDesc.forEach((item) => {
					fn(item);
				});
			},
			
			// Метод анимации при наведении на карточку
			hoverProduct: function (e) {
				let target = e.currentTarget;
				let button = target.querySelector('.product__button');
				
				if (e.type === 'mousemove') {
					target.classList.add('product--scale');
					button.classList.add('primary');
				} else if (e.type === 'mouseleave') {
					target.classList.remove('product--scale');
					button.classList.remove('primary');
				}
			},

			scrollCatalog() {
				console.log('Опааа')
				let mainWrap = document.querySelector('.wrap-catalog');
				mainWrap.classList.remove('main--load');
				mainWrap.classList.add('main--success');
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
