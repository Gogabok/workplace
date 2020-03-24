<template>
  <div class="sections-tree">
    <div class="section-node" v-for="section in currentSections" :key="section.parent.number + Math.random()">
      <div :class="`node-wrapper ${section.children.length === 0 || depth === 2 ? 'no-expand-image' : ''}`">
        <div class="image-state" @click="toggleSection(section)">
          <img :src="section.treeActive ? '/images/prod/minus.png' : '/images/prod/plus.png'" alt="">
        </div>
        <div class="section-name">
          <!-- <nuxt-link :to="{name: 'catalog-modification-section-id', params: {id: section.parent.number, parentId: section.parent.parentid, modification: modificationId, sectionDescription: section.parent.description}}"> -->
          <a href="#" @click.prevent="linkTo(section)">
            <span :class="section.parent.number === $store.getters.getExpandedSectionIds[0] ? 'node-selected' : ''">
              {{section.parent.description}}
            </span>
          </a>
        </div>
      </div>
      <section-tree :modificationId="modificationId" :selectedSectionId="selectedSectionId" :style="{paddingLeft: (15 * (depth + 1)) + 'px'}" v-if="depth < 3 && section.treeActive" :depth="depth + 1" :nestedSection="section.children" ></section-tree>
    </div>
  </div>
</template>
<script>
  import api from '~/assets/js/api.js'
  import Loader from '~/components/Loader.vue'
  export default {
    name: 'SectionTree',
    props: {
      nestedSection: Array,
      depth: Number,
      selectedSectionId: [Number, String],
      modificationId: [Number, String],
    },
    data() {
      let nestedArr = []
      if(this.nestedSection) {
        nestedArr = [...this.nestedSection]
        nestedArr.forEach(section => {
          this.$set(section, 'treeActive', false)
          if(this.$store.getters.getExpandedSectionIds.filter(id => id === section.parent.number).length > 0) {
            this.$set(section, 'treeActive', true)
          }
        })
      }
      return {
        currentSections: this.nestedSection ? [...nestedArr] : []
      }
    },
    mounted() {
      if(!this.nestedSection) {
        let manufacturer = this.$store.getters["getSelectedManufacturer"] ? this.$store.getters["getSelectedManufacturer"] : JSON.parse(localStorage.getItem(this.$route.params.auto))
        let model = this.$store.getters["getSelectedModel"] ? this.$store.getters["getSelectedModel"] : JSON.parse(localStorage.getItem(this.$route.params.model))
        let modification = this.$store.getters["getSelectedModification"] ? this.$store.getters["getSelectedModification"] : JSON.parse(localStorage.getItem(this.$route.params.modification))
        if(!this.$store.getters["getSelectedManufacturer"]) {
          this.$store.commit('setSelectedManufacturer', manufacturer)
        }
        if(!this.$store.getters["getSelectedModel"]) {
          this.$store.commit('setSelectedModel', model)
        }
        if(!this.$store.getters["getSelectedModification"]) {
          this.$store.commit('setSelectedModification', modification)
        }

        setTimeout(() => {
          api.getGarageSections(manufacturer.description, model.description, modification.description)
          .then(response => {
            this.$store.commit('setSections', response)
            this.currentSections.push(...response)
            this.getRootIdsOfChildSection(Number.parseInt(this.selectedSectionId))
            this.currentSections.forEach(section => {
              this.$set(section, 'treeActive', false)
              if(this.$store.getters.getExpandedSectionIds.filter(id => id === section.parent.number).length > 0) {
                this.$set(section, 'treeActive', true)
              }
            })
          })
          .catch(error => {
            console.log(error)
          })
        }, 0);
      }
    },
    methods: {
      linkTo (section) {
        let manufacturer = this.$store.getters["getSelectedManufacturer"]
        let model = this.$store.getters["getSelectedModel"]
        let modification = this.$store.getters["getSelectedModification"]
        this.$router.push(`/${manufacturer.description.replace(/\//g, '%2F')}/${model.description.replace(/\//g, '%2F')}/${modification.fulldescription.replace(/\//g, '%2F')}/${section.parent.number}`)
        // :to="{name: 'catalog-modification-section-id', params: {id: section.parent.number, parentId: section.parent.parentid, modification: modificationId, sectionDescription: section.parent.description}}"
      },
      toggleSection(section) {
        if(this.depth < 3) {
          section.treeActive = !section.treeActive
        }
      },
      getRootIdsOfChildSection(childId) {
        const allSections = [...this.currentSections]
        let nodeQueue = []
        let foundChild = null
        let foundGraph = null

        allSections.forEach(graph => {
          nodeQueue.push(graph)
          while(nodeQueue.length > 0) {
            let currentChild = nodeQueue.shift()
            if(currentChild.parent.number === childId) {
              foundChild = currentChild.parent.number;
              foundGraph = graph
              break;
            }
            currentChild.children.forEach(child => {
              if(child.parent.number === childId) {
                foundChild = currentChild.parent.number;
                foundGraph = graph
              }
              nodeQueue.push(child)
            })
          }
        })

        let currentParentId = childId
        let ids = [childId]

        nodeQueue = []
        nodeQueue.push(foundGraph)

        while(currentParentId !== 0) {
          nodeQueue.push(foundGraph)
          while(nodeQueue.length > 0) {
            let currentChild = nodeQueue.shift()
            if(currentChild.parent.number === currentParentId) {
              currentParentId = currentChild.parent.parentid
              ids.push(currentChild.parent.number)
              break;
            }
            currentChild.children.forEach(child => {
              if(currentParentId === child.parent.number) {
                currentParentId = child.parent.parentid;
                ids.push(child.parent.parentid)
              }
              nodeQueue.push(child)
            })
          }
        }

        this.$store.commit('setExpandedSectionIds', Array.from(new Set(ids)))
      }
    }
  }
</script>
<style lang="sass">
.sections-tree
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  & .section-node
    display: flex
    flex-direction: column
    flex-wrap: nowrap
  & .section-node:first-of-type ~ *
    margin-top: 10px
  & .node-wrapper
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    justify-content: flex-start
    padding: 2px 2px
    cursor: pointer
    align-items: center
    &.no-expand-image > .image-state
      display: none
    & .section-name
      padding-left: 15px
  & .node-selected
    color: #cb1300
  & .image-state
    margin-bottom: 3px



</style>
