import React from "react";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./colorpanel/colorpanel";
import SidePanel from "./sidepanel/sidepanel";
import Messages from "./Messages/message";
import MetaPanel from "./MetaPanel/metapanel";
import "./App.css";
import { connect } from "react-redux";

const App = ({ currentUser, currentChannel }) => {
  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      <ColorPanel />
      <SidePanel
        currentUser={currentUser}
        key={currentUser && currentUser.uid}
      />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          currentUser={currentUser}
        />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
});

export default connect(mapStateToProps)(App);
