<template>
    <div>
        <demo-header></demo-header>
        <hr/>
        <div>
            首页？？？
        </div>
        <hr/>
        <demo-footer></demo-footer>
    </div>
</template>
<script>
import demoHeader from '@/components/common/DemoHeader'
import demoFooter from '@/components/common/DemoFooter'

export default {
    name:'DemoHome',
    components:{demoHeader,demoFooter}
}
</script>