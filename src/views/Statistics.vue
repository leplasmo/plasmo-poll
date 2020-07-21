<template>
  <div class="statistics">
    <v-container fluid class="my-5">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">Open Dialog</v-btn> -->
          <v-btn
            color="pink"
            dark
            small
            fixed
            bottom
            right
            fab
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Create a new poll</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row class="d-flex flex-column align-center">
                <v-col cols="12">
                  <v-row class="mb-4">
                    <v-text-field
                      v-model="newpoll.question"
                      label="Question*"
                      name="question"
                      hint="The question you want the people to vote on"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-textarea
                      v-model="newpoll.content"
                      outlined
                      name="description"
                      label="Description"
                      placeholder="Explain the context for this poll"
                    ></v-textarea>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="newDate"
                            label="End Date:"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="newDate"
                          @input="menu1 = false"
                          :min="today"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="6">
                      <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="newTime"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="newTime"
                            label="End time:"
                            prepend-icon="mdi-clock-time-eight-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="newTime"
                          full-width
                          format="24hr"
                          @click:minute="$refs.menu.save(newTime)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>

                  <v-row class="mb-4">
                    <v-text-field
                      v-model="newAnswer"
                      label="Add an answer"
                      hint="The question you want the people to vote on"
                      persistent-hint
                      required
                      v-on:keyup.enter="addAnswer()"
                    ></v-text-field>
                    <v-icon>mdi-plus-thick</v-icon>
                  </v-row>
                  <v-row class="mb-4" cols="12" sm="8" md="6">
                    <v-container v-if="newpoll.answers" outlined>
                      <v-row cols="12" sm="8" md="6" class="body-2 mb-2"
                        >Possible answers (so far):</v-row
                      >
                      <v-row
                        cols="12"
                        v-for="item in newpoll.answers"
                        :key="item.text"
                        class="grey lighten-3 mb-1"
                      >
                        <v-col cols="9">
                          <v-icon left>mdi-format-list-bulleted</v-icon>
                          {{ item.text }}
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="3">
                          <div class="text-right">
                            <v-btn
                              class="text-right"
                              x-small
                              color="error"
                              @click="removeAnswer(item.text)"
                            >
                              Remove
                              <!-- <v-icon>mdi-delete</v-icon> -->
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="resetNewPoll()"
              >Close</v-btn
            >
            <v-btn color="blue darken-1" text @click="addPoll()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-row class="d-flex flex-column align-end">
        <v-toolbar dense flat>
          <v-text-field
            hide-details
            prepend-icon="mdi-text-search"
            single-line
            v-model="filterString"
          ></v-text-field>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </v-row>
      <v-expansion-panels inset hover>
        <v-expansion-panel
          v-for="poll in polls"
          :key="poll.question"
          class="my-1"
        >
          <v-expansion-panel-header>
            <span
              :class="
                `text-xs-body-1 text-sm-subtitle-1 text-md-h6 ${getTextColor(
                  poll,
                )}`
              "
            >
              {{ poll.question }}
              <v-icon v-if="poll.myVote">mdi-check</v-icon>
            </span>
            <span class="text-right">
              <v-chip
                v-for="tag in poll.tags"
                :key="tag.text"
                class="mx-1 hidden-sm-and-down"
                color="pink"
                label
                text-color="white"
                x-small
              >
                <v-icon x-small left>mdi-label</v-icon>
                {{ tag.text }}
              </v-chip>
            </span>
            <span class="caption grey--text text-right mr-2 hidden-xs-only"
              >{{ poll.createdAt }} - ({{ poll.askedBy }})</span
            >
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p :class="`text-body-2 font-weight-light ${getTextColor(poll)}`">
              {{ poll.content }}
            </p>
            <v-divider></v-divider>
            <v-container>
              <v-row align="center" justify="center">
                <v-card class="px-6" outlined>
                  <v-row>
                    <v-radio-group
                      :disabled="isClosed(poll)"
                      dense
                      :mandatory="false"
                      label="Your answer:"
                      v-model="poll.myVote"
                    >
                      <v-radio
                        v-for="answer in poll.answers"
                        :key="answer.text"
                        :label="answer.text"
                        :value="answer.text"
                        :checked="
                          poll.myVote !== undefined &&
                          poll.myVote === answer.text
                            ? true
                            : false
                        "
                      ></v-radio>
                    </v-radio-group>
                  </v-row>
                  <v-row class="d-flex flex-column align-end">
                    <v-btn
                      :disabled="isClosed(poll)"
                      color="orange"
                      class="ml-1 mb-3"
                      @click="resetVote(poll)"
                      >Reset vote</v-btn
                    >
                  </v-row>
                </v-card>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterString: '',
      today: new Date().toISOString().substr(0, 10),
      newDate: new Date().toISOString().substr(0, 10),
      newTime: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      menu1: false,
      menu2: false,
      dialog: false,
      newAnswer: '',
      newpoll: {
        answers: [],
      },
      polls: [
        {
          question: 'What is your favorite color?',
          content:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, necessitatibus natus. Aspernatur corporis aperiam sapiente, adipisci doloremque, neque et in consectetur vero aliquam eius amet magni officia, aut voluptatibus non?',
          answers: [
            {
              text:
                'red, but this a longer response in order to test text wrapping',
            },
            { text: 'green' },
            { text: 'blue' },
          ],
          tags: [{ text: 'opinion' }, { text: 'personal' }],
          askedBy: 'leplasmo',
          createdAt: '2020-07-18',
          endsBy: '2020-07-30',
          status: 'open',
          answered: true,
        },
        {
          question: 'How old are you?',
          content:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, necessitatibus natus. Aspernatur corporis aperiam sapiente, adipisci doloremque, neque et in consectetur vero aliquam eius amet magni officia, aut voluptatibus non?',
          answers: [{ text: '10' }, { text: '20' }, { text: '30' }],
          askedBy: 'leplasmo',
          createdAt: '2020-07-18',
          endsBy: '2020-07-25',
          status: 'open',
          answered: false,
        },
        {
          question: 'Do you prefer cats or dogs?',
          content:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, necessitatibus natus. Aspernatur corporis aperiam sapiente, adipisci doloremque, neque et in consectetur vero aliquam eius amet magni officia, aut voluptatibus non?',
          answers: [{ text: 'cats' }, { text: 'dogs' }],
          askedBy: 'leplasmo',
          createdAt: '2020-07-18',
          endsBy: '2020-07-20',
          status: 'closing',
          answered: false,
        },
        {
          question: 'Who likes pizza?',
          content:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, necessitatibus natus. Aspernatur corporis aperiam sapiente, adipisci doloremque, neque et in consectetur vero aliquam eius amet magni officia, aut voluptatibus non?',
          answers: [{ text: 'yes' }, { text: 'no' }],
          askedBy: 'leplasmo',
          createdAt: '2020-07-18',
          endsBy: '2020-07-18',
          status: 'closed',
          answered: true,
        },
      ],
    };
  },
  methods: {
    isClosed(poll) {
      let endTime = new Date(poll.endsBy).getTime();
      let currentTime = new Date().getTime();
      if (endTime < currentTime) return true;
      else return false;
    },
    getTextColor(poll) {
      if (this.isClosed(poll)) return 'grey--text';
      else return '';
    },
    addAnswer() {
      // check if it is empty
      if (this.newAnswer.length !== 0 && this.newAnswer.trim())
        this.newpoll.answers.push({ text: this.newAnswer.trim() });
      this.newAnswer = '';
    },
    removeAnswer(value) {
      console.log(`fired removeAnswer(${value})`);
      this.newpoll.answers = this.newpoll.answers.filter(
        (item) => item.text !== value,
      );
    },
    addPoll() {
      // validate that required fields were provided
      // we need, at least, a question and more than 2+ answers
      if (this.newpoll.answers.length > 1 && this.newpoll.question) {
        this.newpoll.createdAt = new Date().toISOString(); // will be added by backend
        this.newpoll.endsBy = `${this.newDate}T${this.newTime}:00.000Z`;
        this.newpoll.askedBy = 'leplasmo';
        this.newpoll.status = 'open';
        this.newpoll.answered = false;
        console.log(this.newpoll);

        this.polls.push(this.newpoll);
      }

      this.resetNewPoll();
    },
    resetNewPoll() {
      this.dialog = false;
      this.newpoll = { answers: [] };
      (this.newDate = new Date().toISOString().substr(0, 10)),
        (this.newTime = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }));
      this.newAnswer = '';
    },
    resetVote(currentPoll) {
      delete this.polls.filter(
        (poll) => poll.question === currentPoll.question,
      )[0].myVote;
      this.$forceUpdate(); // required to refresh the template
    },
  },
};
</script>

<style></style>
