module.exports = {
  Query: {
    launches: (_, __, { dataSources }) =>
      dataSources.launchAPI.getAllLaunches(),
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
  },
  Mission: {
    //default size is 'LARGE' if not provided
    missionPatch: (mission, { size } = { size: 'LARGE'}) => {
      return size === 'SMALL'
        ? mission.missionPatchSmall
        : mission.missionPatchLarge
    },
  },
  Launch: {
    isBooked: async (launch, _, { dataSources }) => 
      dataSources.userAPI.isBookedOnLaunch({ launchID: launch.id})
  },
  Users: {
    trips: async (_, __, { dataSources }) => {
      // get ids of launches by user
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser()
      if(!launchIds.length) return []
      //look up those launches by thier ids
      return (
        dataSources.launchAPI.getLaunchesByIds({
          launchIds,
        }) || []
      )
    }
  }
};