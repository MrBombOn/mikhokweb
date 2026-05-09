/**
 * @file Publikus útvonal JSON-LD (CollectionPage vs WebPage) — Fázis 18.
 */
import type { RouteMetaKey } from '@/lib/seo';
import { messages } from '@/lib/i18n/messages';
import { buildCollectionPageJsonLd, buildWebPageJsonLd, SeoJsonLd } from '@/lib/seo/jsonld';

export type PublicJsonLdLayout = 'collection' | 'webpage';

export function PublicRouteJsonLd(props: {
  routeKey: RouteMetaKey;
  path: string;
  layout?: PublicJsonLdLayout;
}) {
  const m = messages.hu.routeMeta[props.routeKey];
  const layout = props.layout ?? 'collection';
  const data =
    layout === 'webpage'
      ? buildWebPageJsonLd({ name: m.title, description: m.description, path: props.path })
      : buildCollectionPageJsonLd({ name: m.title, description: m.description, path: props.path });
  return <SeoJsonLd data={data} />;
}
