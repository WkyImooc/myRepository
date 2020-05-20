<template>
	<div class="play" ref="play">
		
    	<img @touchend="back()" class="icon-back"  width="48" height="48" src="./left.png">
    	
		<div ref="wrapper" class="wrapper">
			<div>
				<ul ref="content" class="content">
					<li ref="item1" class="item1" v-for="(item, index) in video_data" :key="index">

						<div ref="video_wrapper" class="video_wrapper" :style="isplay ? 'background-color: #000;' : ''">
							<div v-if="play_index === index">
								<video ref="video" v-if="isplay" @play="play()" @pause="pauses()"
									   autoplay playsinline width="100%"
									   :poster=" item.image ? item.image : '../../assets/imgs/x.png'">
									<source :src="item.url" type="video/mp4">
								</video>
							</div>
							<div v-if="play_index !== index || !isplay">
								<img :src=" item.image ? item.image : '/static/x.png'" width="100%">
								<span class="btn-play"  @touchend="video_play()">
										<em class="play-layout"></em>
										<em class="can-play"></em>
									</span>
							</div>
						</div>

						<div class="chat" ref="chat">
							<div class="pos_top" ref="pop_top">
								<ul @touchmove="comment_move()" ref="comment_list" class="t_comment">
									<li class="item" v-for="com in item.by_comment">
										<div class="text">
											<span style="display: inline;" class="name">{{com.user_name}}:</span>
											<span style="display: inline; line-height: 1.1;">{{com.content}}</span>
										</div>
									</li>
								</ul>
								<div @touchend="selectItem(item)" class="t_pic">
									<img width="100%" :src="item.by_goods ? item.by_goods.imgs : '/static/x.png'" alt="" />
									<p class="price"><span class="money">￥{{item.by_goods ? item.by_goods.price : '0'}}</span></p>
								</div>
							</div>
							<div class="pos_bottom">
								<div ref="input_buttons" class="input_buttons" >
									<input @touchend="input_up(index)"  v-model="comment_text" class="input_button" type="text" placeholder="输入评论" />
									<span class="send" @touchend="send(index)">发送</span>
								</div>
								<div class="like">
									<img v-if="!islike" width="30" @touchend="change_like()" src="../../assets/imgs/like1.png"/>
									<img v-else width="30" @touchend="change_like()"  src="../../assets/imgs/like_a.png"/>
								</div>
								<div class="product">
									<img width="55" height="50" :src="item.by_seller ? item.by_seller.logo : '/static/x.png'" alt="" />
								</div>
							</div>
						</div>

					</li>
				</ul>
				<div class="pullup-wrapper">
					<div v-if="!isPullUpLoad" class="before-trigger">
						<span class="pullup-txt">加载更多</span>
					</div>
					<div v-else class="after-trigger">
						<span class="pullup-txt">Loading...</span>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	// import '../../assets/css/reset.css'
	import BScroll from '@better-scroll/core'
	import Pullup from '@better-scroll/pull-up'
	import axios from 'axios'
	import {rootUrl} from "../../common/js/config";
	import {getLocalStroge} from "../../common/js/localStore";

	export default {
		data () {
			return {
				contentScroll:null,	// better-scroll实例
				windowsHeight: '',	// 计算后的屏幕高度
				prev_scrollY:0,		// 上一次scrollY
				scroll_index:0,		// 滑动列表下标
				scroll_time: 500,	// 滑动过度时间
				video_arr:[],		// 视频列表项
				isPullUpLoad: false,// 上拉加载状态控制
				page: 1,			// 上拉加载分页数
				pageSize: 3,		// 每页多少条

				play_index:0,		// 视频下标 ： 相当于延时 scroll_time毫秒后的scroll_index 为了实现无缝滑动切换视频
				isplay: false, 		// 正在播放


				platFlag: null,// 机型
				comment_text: '',

				islike: true, //是否喜欢
				show_comment:false, //显示评论
				isReset: true,   //页面是否归位
				has_comment: false,  //是否有评论
				video_data:[],
				video_data1:[
					{
						src: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/14a7ce0e294881190014951425/v.f20.mp4?dockingId=99c5c56e-3d68-4353-a22a-8c8068c39b01&storageSource=3',
						poster: '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/47c93de8678ddf49a7c089a2cd098efc.jpg?w=1080&h=1880&bg=FFFFFF',
						name: 'Redmi K30 Pro',
						desc: '对视频的描述  1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢',
						likeNum: '111',
						commentNum: '123'
					},
					{
						src: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/09792713312332032104005633/v.f20.mp4?dockingId=9f52169b-2b6b-4328-830b-7b8a87a0db08&storageSource=3',
						poster: '//img30.360buyimg.com/sku/jfs/t1/123076/13/924/359929/5eb8a50eE4008f283/cd16c590ab3173f0.jpg',
						name: 'a豆adolbook13 2020',
						desc: '对视频的描述  1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢',
						likeNum: '111',
						commentNum: '123'
					},
					{
						src: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/7be8878d261508727554183169/v.f20.mp4?dockingId=20aeedc8-5802-47cf-8af1-82c269b73bde&storageSource=3',
						poster: '//img30.360buyimg.com/popWaterMark/jfs/t1/107807/14/8331/120911/5e685f92E2f7037de/aed375ab03cbe7e3.jpg!q70.dpg.webp',
						name: '小米（MI）电视5',
						desc: '对视频的描述  1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢',
						likeNum: '111',
						commentNum: '123'
					},
					{
						src: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/483102b6239374479682772993/v.f20.mp4?dockingId=2184fbd6-695e-4c9a-b817-70ea9e48baf4&storageSource=3',
						poster: '//img13.360buyimg.com/imgzone/jfs/t1/73653/20/12171/153533/5d995d32Ed382bb55/550c68694afa10ba.jpg!q70.dpg.webp',
						name: 'MIFENG',
						desc: '对视频的描述  1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢',
						likeNum: '111',
						commentNum: '123'
					},
					{
						src: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/698525be295295324330151937/v.f20.mp4?dockingId=51153afb-20fc-41f8-b124-51a9cc9cfad4&storageSource=3',//require("../../assets/video/video1.mp4"),
						poster: 'https://img30.360buyimg.com/sku/jfs/t1/53805/20/2055/376927/5cfe2263Ed7284380/1aa8962480fa5c41.jpg',
						name: '手环',
						desc: '对视频的描述  1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢',
						likeNum: '111',
						commentNum: '123'
					},
					{
						src: 'http://192.168.0.128/upload/video/2020Apr/40f7ced6ba3f8944.mp4',
						poster:'http://192.168.0.128/upload/image/2020Apr/914be27a396ebb56.jpg',
						name: 'P图的强大',
						desc: '对视频的描述  1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢',
						likeNum: '111',
						commentNum: '123'
					},
					{
						src: 'http://192.168.0.128/upload/video/2020Apr/6afad24f08c8e2ec.mp4',
						poster:'http://192.168.0.128/upload/image/2020Apr/c20df9a7706a4918.jpg',
						name: '认错外国人了',
						desc: '对视频的描述  1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢',
						likeNum: '111',
						commentNum: '123'
					},
					{
						src: 'http://192.168.0.128/upload/video/2020Apr/ce8e46eedc2e41ae.mp4',
						poster:'http://192.168.0.128/upload/image/2020Apr/5bcc0e60675e568d.jpg',
						name: '你有对象么',
						desc: '对视频的描述  1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢',
						likeNum: '111',
						commentNum: '123'
					},

				],
				comment:[
					{
						name:'neme',
						text:'123',
					},
					
					{
						name:'neme',
						text:'123',
					},{
						name:'neme',
						text:'123',
					},
					
					{
						name:'neme',
						text:'123',
					},
					{
						name:'neme',
						text:'123',
					},{
						name:'neme',
						text:'123',
					},
					
					{
						name:'neme321',
						text:'123',
					},
					
				]
			}
		},
		beforeDestroy(){
			document.querySelector('.tag').style.display = ''
		},
		mounted() {
			document.querySelector('.tag').style.display = 'none'
			this._inits()
		},
		computed: {
			video_height_arr: function () {
				let list = [], length = this.video_data.length, height = this.video_arr[0].clientHeight;
				for (let i = 0; i < length; i++) {
					list.push(height*i);
				}
				return list;
			},
		},
		watch: {
			video_data: function () {
				this.$nextTick(() => {
					this._calHeight()
					this._initScroll()
				})
			},
			scroll_index: function () {
				setTimeout(()=>{
					this.play_index = this.scroll_index
				},this.scroll_time)
			}
		},
		methods: {
			cs1() {
					let cs = {
						src: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/698525be295295324330151937/v.f20.mp4?dockingId=51153afb-20fc-41f8-b124-51a9cc9cfad4&storageSource=3',
						poster: 'https://img30.360buyimg.com/sku/jfs/t1/53805/20/2055/376927/5cfe2263Ed7284380/1aa8962480fa5c41.jpg',
						name: 'kezin_z',
						desc: '对视频的描述  1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢1我喜欢',
						likeNum: '111',
						commentNum: '123'
					};
					this.video_data.push(cs)
			},
			_inits(){
				this._initData()
				this.$refs.wrapper.addEventListener('touchend',()=>{
					window.event.stopPropagation();
					if(this.video_arr[this.scroll_index]){
						this.contentScroll.scrollToElement(this.video_arr[this.scroll_index], this.scroll_time);
					}
				});
				this.platFlag = this.getDevice();


			},
			async _initData()
			{
				this.windowsHeight = window.innerHeight + 'px';
				this.$refs.play.style.height= window.innerHeight + 'px';
				let url = rootUrl + '/YouPin/public/index.php/api/index/video';
				let res = await axios.post(url, { page: this.page++, page_size: this.pageSize })
				if (res.data.status === 1) {
					this.video_data = res.data.data
				} else {
					alert(res.data.message)
				}
			},
			_initScroll() {

				if (!this.contentScroll)
				{
					BScroll.use(Pullup)
					this.contentScroll = new BScroll(this.$refs.wrapper, {
						click: true,
						momentum: false,	// 阻止加速度效果
						preventDefault: false,
						probeType: 2,	// 事件触发频繁度，2为最佳
						bounce: false,	// 反弹特效
						pullUpLoad: true,
					 // tap:true,
					 // stopPropagation:false,
					 //	preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }
					 //	disableMouse: false,
					 //	disableTouch: false
					});
					this.contentScroll.on('pullingUp', this.pullingUpHandler)

					this.contentScroll.on('scroll', (pos) => {
						this.scrollY = Math.abs(Math.round(pos.y)) // 实时变化的Y值的位置

						for (let i = 0; i < this.video_height_arr.length; i++) {
							let height1 = this.video_height_arr[i] + 60
							let height2 = this.video_height_arr[i + 1] - 60
							if(height2){
								if(this.scrollY >= height1 && this.scrollY < height2){
									if(pos.y < this.prev_scrollY){
										this.scroll_index = i+1;
									}else if(pos.y > this.prev_scrollY){
										this.scroll_index = i;
									}
									break;
								}
							}
						}
						this.prev_scrollY = pos.y;
					})
				}else{
					this.contentScroll.refresh();
				}
			},
			_calHeight(){
				let video_arr = this.$refs.item1;
				for (let i = 0; i < video_arr.length; i++) {
					video_arr[i].style.height= this.windowsHeight;
				}
				this.video_arr = video_arr
			},
			//上拉加载
			async pullingUpHandler() {
				this.isPullUpLoad = true
				let url = rootUrl + '/YouPin/public/index.php/api/index/video';
				let res = await axios.post(url, { page: this.page++, page_size: this.pageSize })
				if (res.data.status === 1)
				{
					this.video_data.push( ...res.data.data)
				} else {
					setTimeout(()=>{ alert(res.data.message); },500)
				}
				this.contentScroll.finishPullUp()
				this.contentScroll.refresh()
				this.isPullUpLoad = false
			},

			video_play(){
				this.isplay = true
				this.$nextTick(()=>{
					this.$refs.video[0].play()
				})
			},
			//播放
			play(){
				this.isplay = true;
			},
			//暂停
			pauses(){
				this.isplay = false;
			},
			end() {},
			//是否喜欢
			change_like(){
				this.islike = !this.islike;
			},
			// 评论
			async send(index){
				let text = this.comment_text ? this.comment_text : '你好'
				this.comment_text = ''
				let video_id = this.video_data[index].id,
					user = getLocalStroge('user', true)

				let url = rootUrl + '/YouPin/public/index.php/api/index/comment';
				let res = await axios.post( url, {
					user_id: user ? user.id : 0,
					user_name: user ? user.name : '游客',
					video_id: video_id,
					content: text
				})
				if (res.data.status === 1) {} else {}
					this.video_data[index].by_comment.unshift({
						user_name: user ? user.name : '游客',
						content: text
					})
					this.$nextTick(()=>{
						let comment_list = this.$refs.comment_list
						comment_list[index].scrollTop = comment_list[index].scrollHeight
					})

			},
			back(){
				document.querySelector('.tag').style.display = ''
				this.$router.push('/')
			},
			selectItem(item){
				this.dataHub.goodsData = item.by_goods
				this.dataHub.sellerData = item.by_seller
				this.$router.push({
					path: '/goods',
				});
			},
			comment_move() {
				window.event.stopPropagation();
			},

			input_up(i){
//				console.log(this.$refs.chat);
				//onresize中,this指的是window,如果需要用到vue的this,需要将vue的this赋值给一个变量使用
				var _this =this;
				var oldHeight = document.documentElement.clientHeight || document.body.clientHeight;
				if (_this.getDevice() === 'ios') {
					document.querySelector('.play').addEventListener('focusin', () => {
						// 软键盘弹出的事件处理
						_this.isReset = false;
//						_this.$refs.chat[i].style.width=window.innerWidth;
//						_this.$refs.chat[i].style.bottom="20px";
					});
					document.querySelector('.play').addEventListener('focusout', () => {
						// 软键盘收起的事件处理
						_this.isReset  = true;
						_this.$refs.chat[i].style.bottom="0";
						setTimeout(() => {
//          // 当焦点在弹出层的输入框之间切换时先不归位
							if (_this.isReset ) {
								window.scroll(0, 0); // 失焦后强制让页面归位
							}
						}, 300);
					});
				} else if (_this.getDevice() === 'android') {

					window.onresize = function () {

						// 键盘弹起与隐藏都会引起窗口的高度发生变化
						var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
//        console.log(resizeHeight+'888');
						if (resizeHeight <oldHeight) {
							// 当软键盘弹起，在此处操作
							_this.isReset  = false;
//							_this.$refs.chat[i].style.width=window.innerWidth;
						_this.$refs.chat[i].style.bottom="20px";

						} else {
							// 当软键盘收起，在此处操作
							_this.isReset  = true;
//							_this.$refs.chat[i].style.width=window.innerWidth;
							_this.$refs.chat[i].style.bottom="0";
							setTimeout(() => {
								if (_this.isReset ) {
									window.scroll(0, 0); // 失焦后强制让页面归位
								}
							}, 300);
						}
					}
				}
			},
			//获取设备
			getDevice() {
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if (isAndroid)
					return 'android';
				if (isiOS)
					return 'ios';
			},

		}
	}
</script>

<style scoped="scoped" type="text/css"	>

	.icon-back{
		display: inline-block;
		position: absolute;
		z-index: 9999;
		left: 10px;
		top: 5px;
	}

	.video_wrapper{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		justify-content: center;
		overflow: hidden;
		position: relative;
		z-index: 99;
	}
	.video_wrapper video {}
	.video_wrapper .btn-play {
		top: 50%;
		left: 50%;
		-webkit-transform: translateX(-50%) translateY(-50%);
		transform: translateX(-50%) translateY(-50%);
	}
	.btn-play {
		position: absolute;
		z-index: 4;
		overflow: hidden;
		width: 68px;
		height: 68px;
		border: 1.5px solid #fff;
		border-radius: 60px;
	}
	.play-layout {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 150px;
		background: rgba(0,0,0,.4);
	}
	.can-play {
		font-size: 0;
		line-height: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		-webkit-transform: translateX(-35%) translateY(-50%);
		transform: translateX(-35%) translateY(-50%);
		border-width: 12px 0 12px 20px;
		border-style: dashed dashed dashed solid;
		border-color: transparent transparent transparent #fff;
	}


	.play{
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		background-color: #fff;
		font-size: 14px;
		color: #fff;
		overflow: hidden;

	}
	.wrapper{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.wrapper::-webkit-scrollbar {
		display: none;
	}
	.content{
		width: 100%;
	}
	.item1{
		transform: translateX(0px);
		width: 100%;
	}
	.chat{
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 165px;
		z-index: 10001;
		overflow: hidden;
	}

	.pos_top{
		position: absolute;
		bottom: 37px;
		left: 2%;
		right: 2%;
		z-index: 100;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		margin-bottom: 10px;

	}
	.pos_top::-webkit-scrollbar{display:none}
	.t_comment{
		display: flex;
		flex-direction: column-reverse;
		/*justify-content: flex-end;*/
		/*flex-flow: column nowrap;*/
		width: 70%;
		height: 115px;
		overflow-y: scroll;
	}
	.t_comment::-webkit-scrollbar {display:none}

	.item{
		width: 100%;
		margin-bottom: 6px;
	}

	.item .text{
		/*width: 100%;*/
		font-size: 13px;
		display: inline-block;
		background-color: rgba(0,0,0,.4);
		word-break:break-all;
		padding: 5px;
		border-radius: 5px;
		line-height: 13px;
	}
	.text .name{
		max-width: 40%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		margin-right: 3px;
		color: yellow;
	}
	.t_pic{
		position: relative;
		margin-bottom: 15px;
		border: 1px rgba(160,160,160,0.3) solid;
		border-radius: 8px;
		width: 85px;
	}
	.t_pic img{
		border-radius: 7px;
	}
	.t_pic:after{
		content: '';
		border: 8px rgba(60,60,60,0.6) solid;
		border-color: rgba(60,60,60,0.6) transparent transparent transparent;
		border-bottom: none;
		position: absolute;
		bottom: -8px;
		left: 36px;
	}
	.price{
		position: absolute;
		left: 0;
		bottom: 3px;
		width: 100%;
		text-align: center;
	}
	.price .money{
		padding: 1px 6px;
		background-color: rgba(0,0,0,.5);
		border-radius: 10px;
		font-size: 12px;
	}



	.pos_bottom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		bottom: 0;
		left: 2%;
		right: 2%;
		width: 96%;
		z-index: 100;
		height: 60px;
	}
	.input_buttons{
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		position: relative;
		width: 65%;
		align-items: center;
		border-radius: 6px;
		background-color: rgba(0,0,0,.4);
		margin-bottom: -15px;
	}
	.input_button{
		outline:none;
		width: 78%;
		height: 35px;
		background-color: rgba(0,0,0,0);
		color: #fff;
		text-indent: 10px;
		outline-color: #fff;
		border-style:none;
		font-size: 15px;
	}
	.pos_bottom .like{
		margin: 0 15px 0 10px;
		margin-bottom: -15px;
	}
	.pos_bottom .product{
		margin-right: 12px;
	}
	.pos_bottom .product img{
		border-radius: 30%;
	}
	.send{
		position: absolute;
		right: 0px;
		top: 0px;
		/*height: 40px;*/
		/*line-height: 42px;*/
		color: #fff;
		/*background-color: #f3f3f3;*/
		padding: 12px 8px;
		border-radius: 3px;
		font-size: 15px;

	}
	.input_button::-webkit-input-placeholder{
		color:#ddd;
	}


	.pullup-wrapper{
		height: 80px;
		line-height: 80px;
		/*padding: 15px;*/
		text-align: center;
		font-size: 18px;
		color: #000;
		background-color: #fff
	}
	.pullup-wrapper .after-trigger{
		color: #007aff;
	}
	.pullup-wrapper .before-trigger{
		/*color: #007aff;*/
	}


	@keyframes anis {
		100% {
			transform:translateX(-200px)
		}
	}
</style>
