
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Infos = new Mongo.Collection('info');

if (Meteor.isServer) {

    // This code only runs on the server

    Meteor.publish('info', function tasksPublication() {

        return Infos.find({

            $or: [

                { private: { $ne: true } },

                { owner: this.userId },

            ],

        });

    });

}


Meteor.methods({

    'info.insert'(text) {

        check(text, String);



        // Make sure the user is logged in before inserting a task

        if (!this.userId) {

            throw new Meteor.Error('not-authorized');

        }



        Infos.insert({

            text,

            createdAt: new Date(),

            owner: this.userId,

            username: Meteor.users.findOne(this.userId).username,

        });

        Infos.update(taskId, { $set: { private: setToPrivate } });

    },

    'info.remove'(taskId) {

        check(taskId, String);

        const task = Infos.findOne(taskId);

        if (task.private && task.owner !== this.userId) {

            // If the task is private, make sure only the owner can delete it

            throw new Meteor.Error('not-authorized');

        }



        Infos.remove(taskId);

    },

    'info.setPrivate'(taskId, setToPrivate) {

        check(taskId, String);

        check(setToPrivate, Boolean);



        const task = Infos.findOne(taskId);



        // Make sure only the task owner can make a task private

        if (task.owner !== this.userId) {

            throw new Meteor.Error('not-authorized');

        }



        Infos.update(taskId, { $set: { private: setToPrivate } });

    },



});

