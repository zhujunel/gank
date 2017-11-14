import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Router from 'next/router'
import { NavBar, Icon } from 'antd-mobile'
import Layout from '../../mobileComponents/Layout'
import ScrollList from '../../mobileComponents/ScrollList'

export default class MobileFE extends Component {
  static async getInitialProps ({ req }) {
    const language = req ? req.headers['accept-language'] : navigator.language

    const res = await fetch('https://gank.io/api/data/%e4%bc%91%e6%81%af%e8%a7%86%e9%a2%91/20/1')
    const json = await res.json()

    return { list: json.results, language }
  }

  constructor (props) {
    super(props)

    this.state = {
      listHeight: 1000
    }
  }

  async componentDidMount () {
    const height = document.documentElement.clientHeight - 45

    this.setState({
      listHeight: height
    })
  }

  render () {
    const {
      list,
      language,
      url: { pathname }
    } = this.props

    return (
      <Layout language={language}>
        <div style={{ paddingTop: 45 }}>
          <NavBar
            mode='dark'
            icon={<Icon type="left" />}
            onLeftClick={() => Router.push('/m')}
          >
            休息视频
          </NavBar>
          <ScrollList
            listType="%e4%bc%91%e6%81%af%e8%a7%86%e9%a2%91"
            listHeight={this.state.listHeight}
            initList={list}>
          </ScrollList>
        </div>
      </Layout>
    )
  }
}