import { FC, JSXElementConstructor, ReactElement } from "react";
import { IconButton, IconProps } from "@chakra-ui/react";
import { DownloadIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Link } from "@components/core";
import { GithubIcon, GitlabIcon, WebsiteIcon, DiscordIcon, LinkedinIcon } from "@components/icons/social";
import { basePath } from "@/lib/env";

export const SocialLink: FC<{ name: string, Icon: import("@chakra-ui/system").ComponentWithAs<"svg", IconProps>, url: string, size?: string }> = ({ name, Icon, url, size = "2em" }) => (
  <Link href={url} isExternal>
    <IconButton 
      aria-label={name}
      icon={(<Icon boxSize={size} color="black"/>)}
    />
  </Link>
);

export const EmailLink: FC<{ email: string }> = ({ email }) => (
  <SocialLink name="Email" Icon={EmailIcon} url={`mailto:${email}`} />
);

export const PhoneLink: FC<{ phone: string }> = ({ phone }) => (
  <SocialLink name="Phone" Icon={PhoneIcon} url={`tel:${phone}`} />
);

export const ResumeLink: FC<{ url: string }> = ({ url }) => (
  <SocialLink name="Resume" Icon={DownloadIcon} url={`${basePath}${url}`} />
);

export const WebsiteLink: FC<{ name: string, url: string }> = ({ name, url }) => (
  <SocialLink name={name} Icon={WebsiteIcon} url={url} />
);

export const GithubLink: FC<{ path: string }> = ({ path }) => (
  <SocialLink name="Github" Icon={GithubIcon} url={`https://github.com/${path}`} />
);

export const GitlabLink: FC<{ path: string }> = ({ path }) => (
  <SocialLink name="Gitlab" Icon={GitlabIcon} url={`https://gitlab.com/${path}`} />
);

export const DiscordLink: FC<{ tag: string, user_id: string }> = ({ tag, user_id }) => (
  <SocialLink name={tag} Icon={DiscordIcon} url={`https://discord.com/channels/@me/${user_id}`} />
);

export const LinkedinLink: FC<{ user_id: string }> = ({ user_id }) => (
  <SocialLink name="Linkedin" Icon={LinkedinIcon} url={`https://linkedin.com/in/${user_id}`} />
);