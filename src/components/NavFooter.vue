<template>
    <div class="footer-wrap">
        <div class="foot-logo">
            <img src="../../public/imgs/logo-footer.png">
            <p>小米商城</p>
        </div>
        <div class="foot-list">
            <a href="#">小米商城主页</a>
            <a href="#">小米商城主页</a>
            <a href="#">小米商城主页</a>
            <a href="#">小米商城主页</a>
            <a href="#" style="border:0">小米商城主页</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .footer-wrap{
        width: 100%; height: 238px;border-top: 4px solid #ff7301;background-color: #333;
        color: #999;font-size: 16px;text-align: center;
    }

    .foot-logo{
        width: 100%; margin-top: 46px; margin-bottom: 36px;
        img{
            display: inline-block; width: 53px; height: 36px; margin-bottom: 13px;
        }
    }

    .foot-list{
        width: 100%;
        a{
            display: inline-block; color: #999; border-right: 1px solid #999; padding: 0 10px;
        }
    }
</style>