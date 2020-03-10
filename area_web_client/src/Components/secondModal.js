import React from 'react';

import './ComponentsStyle/secondModal.css'

import Dropdown from 'react-dropdown'
import axios from 'axios'
import 'react-dropdown/style.css'

import TrelloFormRea from './TrelloFormRea'
import GithubForm from './GithubForm'
import GithubFormRea from './GithubFormRea'
import LinkForm from './LinkForm'
import TrelloFormCard from './TrelloFormCard';
import TrelloFormCardRea from './TrelloFormCardRea';
import SpotifyFollowForm from './SpotifyFollowForm';
import SpotifyFollowFormRea from './SpotifyFollowFormRea';
import TrelloFormBoard from './TrelloFormBoard';
import TrelloFormBoardRea from './TrelloFormBoardRea';
import SlackFormRea from './SlackFormRea';
import ImgurFormRea from './ImgurFormRea';


const hideDrop = [
    '0'
  ]
  
const defaultOption = hideDrop[0]

class SecondModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            listRea: [],
            defaultAction: "",
            defaultRea: "",
            action: "",
            reaction: "",
            isDone: false
        }

        this.getActions = this.getActions.bind(this)
        this.getRea = this.getRea.bind(this)
        this.buildJson = this.buildJson.bind(this)
    }

    onSelectAction(e) {
        this.setState({
            act: true,
            action: e.value
        })
    }

    onSelectRea(e) {
        this.setState({
            rea: true,
            reaction: e.value
        })
    }

    getActions() {
        const config = {
            headers: { Authorization:`Bearer ${window.localStorage.getItem("token")}`},
        }
        axios.get(`http://lucaspoirel.ovh:8080/${window.localStorage.getItem("serviceAction")}/service`, config)
        .then(res => {
            window.localStorage.setItem("actions", res.data.action.split("$"))
            this.setState({
                list: res.data.action.split("$"),
                defaultAction: res.data.action.split("$")[0]
            })
        })
    }

    getRea() {
        const config = {
            headers: { Authorization:`Bearer ${window.localStorage.getItem("token")}`},
        }
        axios.get(`http://lucaspoirel.ovh:8080/${window.localStorage.getItem("serviceRea")}/service`, config)
        .then(res => {
            window.localStorage.setItem("reactions", res.data.action.split("$"))
            this.setState({
                listRea: res.data.reaction.split("$"),
                defaultRea: res.data.reaction.split("$")[0]
            })
        })
    }

    buildJson() {
        var result
        var urlAction = ""
        var urlRea = ""
        var params
        var paramsRea

        /// ACTIONS

        if (window.localStorage.getItem("serviceAction") === "github") {
            urlAction = "http://lucaspoirel.ovh:8080/" + window.localStorage.getItem("serviceAction") + "/" + window.localStorage.getItem("github-login") + "/" + window.localStorage.getItem("selectedRepo") + "/select"
            params = JSON.stringify({
                token: window.localStorage.getItem("github-token"),
                name: window.localStorage.getItem("github-login"),
                content: window.localStorage.getItem("selectedRepo")
            })
        }
        if (window.localStorage.getItem("serviceAction") === "spotify") { 
            if (this.state.action === "New Follower on Me") {
                urlAction = `http://lucaspoirel.ovh:8080/spotify/me/${window.localStorage.getItem("spotify-token")}`
                params = JSON.stringify({
                    token: window.localStorage.getItem("spotify-token"),
                    name: "spotifyName",
                    content: "me"
                })
            } else {
                urlAction = `http://lucaspoirel.ovh:8080/spotify/search/${window.localStorage.getItem("spotify-artist")}/${window.localStorage.getItem("spotify-token")}`
                params = JSON.stringify({
                    token: window.localStorage.getItem("spotify-token"),
                    name: window.localStorage.getItem("spotify-artist"),
                    content: window.localStorage.getItem("spotify-artist")
                })
            }
        }
        if (window.localStorage.getItem("serviceAction") === "trello") {
            if (this.state.action === "New Board") {
                urlAction = `http://lucaspoirel.ovh:8080/trello/members/${window.localStorage.getItem("trello-name")}/1b710789e2cb56480a610f5a0ae629f6/${window.localStorage.getItem("trello-token")}/boards`
                params = JSON.stringify({
                    token: "1b710789e2cb56480a610f5a0ae629f6",
                    oauth: window.localStorage.getItem("trello-token"),
                    content: "??"
                })  
            }
            if (this.state.action === "New list") {
                urlAction = `http://lucaspoirel.ovh:8080/trello/boards/${window.localStorage.getItem("selectedBoardId")}/1b710789e2cb56480a610f5a0ae629f6/${window.localStorage.getItem("trello-token")}`
                params = JSON.stringify({
                    token: "1b710789e2cb56480a610f5a0ae629f6",
                    oauth: window.localStorage.getItem("trello-token"),
                    ID: window.localStorage.getItem("selectedBoardId"),
                    content: window.localStorage.getItem("selectedBoard")
                }) 
            }
            if (this.state.action === "New Card") {
                urlAction = `http://lucaspoirel.ovh:8080/trello/idList/${window.localStorage.getItem("selectedListId")}/1b710789e2cb56480a610f5a0ae629f6/${window.localStorage.getItem("trello-token")}`
                params = JSON.stringify({
                    token: "1b710789e2cb56480a610f5a0ae629f6",
                    oauth: window.localStorage.getItem("trello-token"),
                    ID: window.localStorage.getItem("selectedListId"),
                    content: window.localStorage.getItem("selectedList")
                }) 
            }
        }

        if (window.localStorage.getItem("serviceAction") === "slack") {
            urlAction = `http://lucaspoirel.ovh:8080/slack/listId/${window.localStorage.getItem("slack-token")}`
            params = JSON.stringify({
                token: window.localStorage.getItem("slack-token"),
                content: "__N__"
            })
        }

        if (window.localStorage.getItem("serviceAction") === "imgur") {
            urlAction = `http://lucaspoirel.ovh:8080/imgur/getreputation/${window.localStorage.getItem("imgur-token")}`
            params = JSON.stringify({
                token: window.localStorage.getItem("imgur-token"),
                content: "__NIN__"
            })
        }

        /// REACTIONS

        if (window.localStorage.getItem("serviceRea") === "github") {
            console.log(window.localStorage.getItem("github-login-rea"))

            urlRea = `http://lucaspoirel.ovh:8080/github/${window.localStorage.getItem("github-login-rea")}/${window.localStorage.getItem("selectedRepoRea")}`
            paramsRea = JSON.stringify({
                token: window.localStorage.getItem("github-token"),
                name: window.localStorage.getItem("github-login-rea"),
                content: window.localStorage.getItem("selectedRepoRea")
            })
        }
        if (window.localStorage.getItem("serviceRea") === "spotify") {
            if (window.localStorage.getItem("type-spotify") === "artist") {
                urlRea = `http://lucaspoirel.ovh:8080/spotify/follow/artist/${window.localStorage.getItem("id-artist-rea")}`
                paramsRea = JSON.stringify({
                    token: window.localStorage.getItem("spotify-token"),
                    type: "artist",
                    name: window.localStorage.getItem("id-artist-rea"),
                    content: window.localStorage.getItem("spotify-artist-rea")
                })
            } else if (window.localStorage.getItem("type-spotify") === "user") {
                urlRea = `http://lucaspoirel.ovh:8080/spotify/follow/user/${window.localStorage.getItem("spotify-user-follow")}`
                paramsRea = JSON.stringify({
                    token: window.localStorage.getItem("spotify-token"),
                    type: "user",
                    name: window.localStorage.getItem("spotify-user-follow"),
                    content: window.localStorage.getItem("spotify-user-follow")
                })
            }
        }
        if (window.localStorage.getItem("serviceRea") === "trello") {
            if (this.state.reaction === "Create a board") {
                urlRea = `http://lucaspoirel.ovh:8080/trello/boards`
                paramsRea = JSON.stringify({
                    token: "1b710789e2cb56480a610f5a0ae629f6",
                    oauth: window.localStorage.getItem("trello-token"),
                    name: window.localStorage.getItem("created-board"),
                    content: window.localStorage.getItem("created-board")   
                })  
            }
            if (this.state.reaction === "Create a new list") {
                urlRea = `http://lucaspoirel.ovh:8080/trello/list`
                paramsRea = JSON.stringify({
                    token: "1b710789e2cb56480a610f5a0ae629f6",
                    oauth: window.localStorage.getItem("trello-token"),
                    name: window.localStorage.getItem("created-list"),
                    ID: window.localStorage.getItem("selectedBoardReaId"),
                    content: window.localStorage.getItem("selectedBoardRea")
                }) 
            }
            if (this.state.reaction === "Create a Card") {
                urlRea = `http://lucaspoirel.ovh:8080/trello/cards`
                paramsRea = JSON.stringify({
                    token: "1b710789e2cb56480a610f5a0ae629f6",
                    oauth: window.localStorage.getItem("trello-token"),
                    ID: window.localStorage.getItem("selectedListReaId"),
                    name: window.localStorage.getItem("created-card"),
                    content: window.localStorage.getItem("created-card")
                }) 
            }
        }

        if (window.localStorage.getItem("serviceRea") === "slack") {
            urlRea = `http://lucaspoirel.ovh:8080/slack/create`
            paramsRea = JSON.stringify({
                token: window.localStorage.getItem("slack-token"),
                name: window.localStorage.getItem("created-conversation"),
                content: window.localStorage.getItem("created-conversation")
            }) 
        }

        if (window.localStorage.getItem("serviceRea") === "imgur") {
            urlRea = `http://lucaspoirel.ovh:8080/imgur/followtag/${window.localStorage.getItem("created-tag")}`
            paramsRea = JSON.stringify({
                token: window.localStorage.getItem("imgur-token"),
                name: window.localStorage.getItem("created-tag"),
                content: window.localStorage.getItem("created-tag")
            }) 
        }

        const config = {
            headers: { Authorization:`Bearer ${window.localStorage.getItem("token")}`},
        }
        axios.get(urlAction, config)
        .then(res => {
            result = res

            axios.post(`http://lucaspoirel.ovh:8080/action/pushActions`,
                { 
                    id: "1",
                    name: this.state.action,
                    apiCall: urlAction,
                    body: params,
                    headers: window.localStorage.getItem("serviceAction"),
                    response: result,
                    user: {id: window.localStorage.getItem("id")},
                    reaction: {
                        name: this.state.reaction,
                        apiCall: urlRea,
                        body: paramsRea,
                        headers: window.localStorage.getItem("serviceRea")
                    }
                },
                {
                    headers: { Authorization:`Bearer ${window.localStorage.getItem("token")}`
                }
            })
            .then(res => {
                console.log(res)
                window.localStorage.removeItem("selectedRepo")
                window.localStorage.removeItem("selectedRepoRea")
                window.localStorage.removeItem("github-login-rea")
                window.location.href = "./HomePage"
            })
        })
    }

    render() {
        let formAction;
        let formReaction;
        if (window.localStorage.getItem("serviceAction") === "trello") {
            if (this.state.action === "New list") {
                formAction = <TrelloFormBoard />
            } else if (this.state.action === "New Card") {
                formAction = <TrelloFormCard />
            } else {
                formAction = <div />
            }
        } else if (window.localStorage.getItem("serviceAction") === "github") {
            formAction = <GithubForm />
        } else if (window.localStorage.getItem("serviceAction") === "linkedin") {
            formAction = <LinkForm />
        } else if (window.localStorage.getItem("serviceAction") === "spotify") {
            if (this.state.action === "New Follower on artist") {
                formAction = <SpotifyFollowForm />
            } else {
                formAction = <div />
            }
        } else {
            formAction = <div></div>
        }

        if(window.localStorage.getItem('serviceRea') === "trello") {
            if (this.state.reaction === "Create a new list") {
                formReaction = <TrelloFormBoardRea />
            } else if (this.state.reaction === "Create a Card") {
                formReaction = <TrelloFormCardRea />
            } else {
                formReaction = <TrelloFormRea />
            }
        } else if (window.localStorage.getItem('serviceRea') === "github") {
            formReaction = <GithubFormRea />
        } else if (window.localStorage.getItem("serviceRea") === "linkedin") {
            formReaction = <LinkForm />
        } else if (window.localStorage.getItem("serviceRea") === "spotify") {
            formReaction = <SpotifyFollowFormRea />
        } else if (window.localStorage.getItem("serviceRea") === "slack") {
            formReaction = <SlackFormRea />
        } else if (window.localStorage.getItem("serviceRea") === "imgur") {
            formReaction = <ImgurFormRea />
        } else {
            formReaction = <div></div>
        }

        return (
            <div className="second-modal-wrapper"
                style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(100vh)',
                    opacity: this.props.show ? '1' : '0',
                }}>
                <div className="second-modal-panel">
                    <div className="drops" >
                        <div className="top-label">
                            <label>Action with {window.localStorage.getItem("serviceAction")}</label>
                            { 
                                this.props.show ? <Dropdown className="dropdown" options={this.state.list} onFocus={this.getActions} onChange={this.onSelectAction.bind(this)} value={this.state.defaultAction} placeholder="Select an option" /> :
                                <Dropdown className="dropdown" options={hideDrop} onChange={this.onSelectAction} value={defaultOption} placeholder="Select an option" />
                            }
                            {formAction}
                        </div>
                        <div className="top-label">
                            <label>Reaction with {window.localStorage.getItem("serviceRea")}</label>
                            {
                                this.props.show ? <Dropdown className="dropdown" options={this.state.listRea} onFocus={this.getRea} onChange={this.onSelectRea.bind(this)} value={this.state.defaultRea} placeholder="Select an option" /> :
                                <Dropdown className="dropdown" options={hideDrop} onChange={this.onSelectRea} value={defaultOption} placeholder="Select an option" />
                            }
                            {formReaction}
                        </div>
                    </div>
                    <div onClick={this.buildJson} className="connectButton">Create Connection</div>
                </div>
            </div>
        )
    }

}

export default SecondModal;