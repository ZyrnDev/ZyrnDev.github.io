---
title: 'Typescript Transitions'
date: '2021-05-25'
author: 'Zyrn'
published: true
---

During this last month I have managed to push through a lot of updates to this website, most of which you can't even see. This is because I took on a a huge refactoring task to port the whole website to [TypeScript][1]. 

[TypeScript][1] has many features which justified the effort required in the write, such as the improved ability for code completion, intellisense, [type checking][3], and more thanks largely to the additional tooling available in most IDEs for [TypeScript][1]. These benefits allow me to write cleaner, more robust, easy to use code at a quicker pace.

<iframe width="560" height="315" margin="auto" style="margin: auto; display: block;" src="https://www.youtube-nocookie.com/embed/ydkQlJhodio" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Since [TypeScript][1] is really just a super-set of JavaScript, I have been able to keep upwards of 80% of the codebase between for both languages. This greatly reduces the amount of work required to update and maintain the website when compared to switching the programming langauge or framework. Another key benefit is that [TypeScript][1] is still compitable with Javascript, so I could have done a gradual transition from Javascript to [TypeScript][1], such as that done by [Slack][2]. I didn't end up doing this as my code base is still small enough that I was able to complete the transition in a couple of days.

The actual transition involved adding and creating type definitions for all the libraries I have been using, both internal and external. In addition, I have also have been adding explict type declarions to all the functions and variables that I have been using, where possible.

One example of how adding typescript changed my code:
```javascript
// JavaScript
export default function Posts({ allPostsData, isUnreleased = false }) {
    // Example JSX body for this function
    return (
      <PostJSX 
        data={allPostsData}
        isUnreleased={isUnreleased}
        {/* use the data */} 
      />
    );
}
```

```javascript
// TypeScript
export default function Posts({
  allPostsData,
  isUnreleased = false
}: {
  allPostsData: PostMetaData[],
  isUnreleased?: boolean,
}) {
    // Example JSX body for this function
    return (
      <PostJSX 
        data={allPostsData}
        isUnreleased={isUnreleased}
        {/* use the data */} 
      />
    );
}
```

As you can see, adding type annotations makes the code a little more verbose, but it also makes it easier to read, understand and use correctly. In this way, I have been able to significantly reduce the amount of work required to update and maintain the website by greatly improving the developer experience.

That's all for this month, I hope you enjoyed it!
Until next time

[1]: https://www.typescriptlang.org/ "Typescript's Official Site"
[2]: https://slack.engineering/typescript-at-slack/ "Slack's Transition to Typescript"
[3]: https://github.com/typescript-eslint/typescript-eslint "Type Checking: TypeScript ESLint"

