import styles from "./guides.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchGuides } from "store/guides-directory/actions";
import { getFiltersFromUrl } from "utils/helpers";
import MainLayout from "components/containers/app/main-layout";
import DirectoryFilter from "components/common/directory-filter";
import GuidesList from "components/presentational/guides-list";

const propTypes = {};

const defaultProps = {};

@withRouter
@connect(
  (state, props) => ({
    guidesList: state.guidesDirectory.get("items"),
    filters: getFiltersFromUrl(props.match, props.location)
  }),
  dispatch => ({
    fetchGuidesAction: (match, location) =>
      dispatch(fetchGuides(match, location))
  })
)
export default class GuidesDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredGuidesList: null
    };

    this.filterGuidesList = this.filterGuidesList.bind(this);
  }

  componentDidMount() {
    this.props.fetchGuidesAction(this.props.match, this.props.location);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.fetchGuidesAction(this.props.match, this.props.location);
    }
    if (this.props.guidesList !== prevProps.guidesList) {
      this.setState({ filteredGuidesList: null });
    }
  }

  filterGuidesList(value) {
    const filteredlist = this.props.guidesList.filter(category =>
      category.name.toLowerCase().includes(value)
    );
    this.setState({ filteredGuidesList: filteredlist });
  }

  render() {
    const { guidesList, filters } = this.props;
    const { filteredGuidesList } = this.state;
    const items = filteredGuidesList || guidesList;
    const baseUrl = "/guides";

    return (
      <MainLayout title="Guides">
        <DirectoryFilter
          baseUrl={baseUrl}
          onSearchFilterChange={this.filterGuidesList}
        />
        <div className={styles.guides}>
          {items &&
            items.length > 0 && (
              <GuidesList
                title={
                  filters.topic
                    ? `Popular guides in ${filters.topic}`
                    : "Popular guides"
                }
                guides={items}
              />
            )}
        </div>
      </MainLayout>
    );
  }
}

GuidesDirectory.propTypes = propTypes;
GuidesDirectory.defaultProps = defaultProps;
