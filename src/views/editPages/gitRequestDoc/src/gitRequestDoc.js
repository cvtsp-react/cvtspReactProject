import React from 'react'
import { Component } from '@/components'
import { Icon, Popconfirm, Timeline } from 'antd'

export default class GitRequestDoc extends Component {
    render() {
        return (
            <Timeline style={{padding: '10px'}}>
                <Timeline.Item>1. 发布版本，发布人先统计所有人员的新增功能(有需求的话，标号写上), 修改的bug(标注注上)</Timeline.Item>
                <Timeline.Item>
                    2. 发布人直接汇总，写好模版
                    <Popconfirm placement="topLeft" okText="Yes" cancelText="No"
                        title={
                            <div>
                                <h3>新增</h3>
                                <h3>1. #520 新增。。。功能</h3>
                                <h3>修复</h3>
                                <h3>1. #520 车组权限-删除机构提示不对</h3>
                            </div>
                        }>
                        <Icon type="question-circle" />
                    </Popconfirm>
                </Timeline.Item>
                <Timeline.Item>
                    3. git发布版本 
                    <Popconfirm placement="bottom" okText="Yes" cancelText="No"
                        title={
                            <div>
                                <h3>以提交test为例</h3>
                                <h3>1. 提交本地(dev)代码到缓存(git add .; git commit -m '注释')</h3>
                                <h3>2. 拉取远程dev代码于本地代码合并，是否有冲突(git pull origin dev)</h3>
                                <h3>3. 提交到远程dev(git push origin dev)</h3>
                                <h3>4. 切换到本地Release分支合并dev代码(git checkout Release;git merge dev)</h3>
                                <h3>5. 拉取远程Release代码,提交(可能会省去)(git pull origin Release;git push origin Release)</h3>
                            </div>
                        }>
                        <Icon type="question-circle" />
                    </Popconfirm>
                </Timeline.Item>
                <Timeline.Item>
                    4. git tag 把所有汇总写上
                    <Popconfirm placement="topLeft" okText="Yes" cancelText="No"
                        title={
                            <div>
                                <h3>以提交test为例</h3>
                                <h3>1. git tag -a 'tag的名字' -m '注释'</h3>
                                <h3>2. git push origin 'tag名字'</h3>
                                <h3>3. 到gitlab中把内容复制到markdown中</h3>
                            </div>
                        }>
                        <Icon type="question-circle" />
                    </Popconfirm>
                </Timeline.Item>
                <Timeline.Item>5. 技术中心的群，发一条信息：前端发布完成，空格， 汇总的信息(*)，最后@王学艳</Timeline.Item>
            </Timeline>
        )
    }
}